/**
 * Rakuten Card installment simulator.
 *
 * Same arithmetic as
 * https://static.card.jp.rakuten-static.com/card_corp/pc/js/contents/adjustment/installment/simulation/main.min.js?20260526
 * (page archive 2026-09-10). Shop fee is floor(amount * 0.0068 * payments).
 * Later fee is floor(amount * totalRate). Monthly fees use the 78 method
 * with the yen remainder added to the first installment. Keep the IEEE
 * multiplications; integer rewrites do not match the site on every amount.
 */

export const SIMULATOR_PAYMENTS = [3, 5, 6, 10, 12, 15, 18, 20, 24, 30, 36] as const;

export const SHOP_PAYMENTS = [2, ...SIMULATOR_PAYMENTS] as const;

const SHOP_PER_PAYMENT_RATE = 0.0068;

const LATER_TOTAL_RATE: Record<number, number> = {
  3: 0.0295,
  5: 0.0445,
  6: 0.052,
  10: 0.0826,
  12: 0.0981,
  15: 0.1216,
  18: 0.1454,
  20: 0.1614,
  24: 0.194,
  30: 0.2438,
  36: 0.2949,
};

const SHOP_APR: Record<number, string> = {
  2: "0.00",
  3: "12.25",
  5: "13.50",
  6: "13.75",
  10: "14.50",
  12: "14.75",
  15: "15.00",
  18: "15.00",
  20: "15.00",
  24: "15.00",
  30: "15.00",
  36: "15.00",
};

const SHOP_FEE_PER_100: Record<number, string> = {
  2: "0.00",
  3: "2.04",
  5: "3.40",
  6: "4.08",
  10: "6.80",
  12: "8.16",
  15: "10.20",
  18: "12.24",
  20: "13.60",
  24: "16.32",
  30: "20.40",
  36: "24.48",
};

const LATER_FEE_PER_100: Record<number, string> = {
  3: "2.95",
  5: "4.45",
  6: "5.20",
  10: "8.26",
  12: "9.81",
  15: "12.16",
  18: "14.54",
  20: "16.14",
  24: "19.40",
  30: "24.38",
  36: "29.49",
};

export type InstallmentService = "shop" | "later";

export type ScheduleRow = {
  times: number;
  payYear: string;
  payMonth: string;
  payAmount: number;
  principal: number;
  feeEachTimes: number;
  balanceAfterPay: number;
};

export type InstallmentSuccess = {
  ok: true;
  amountYen: number;
  payments: number;
  service: InstallmentService;
  serviceLabelJa: string;
  serviceLabelKo: string;
  annualRatePercent: string;
  feePer100Yen: string;
  feeTotal: number;
  feeAverage: number;
  payAmountTotal: number;
  payFirstTime: number;
  payAfterSecondTime: number;
  debitDay: 27;
  schedule: ScheduleRow[];
  notes: string[];
};

export type InstallmentFailure = {
  ok: false;
  error: string;
};

export type InstallmentResult = InstallmentSuccess | InstallmentFailure;

export type InstallmentRequest = {
  amountYen: number;
  payments: number;
  service: InstallmentService;
  firstPaymentYear?: number;
  firstPaymentMonth?: number;
  now?: Date;
};

function tokyoYmd(now: Date): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const read = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  return { year: read("year"), month: read("month"), day: read("day") };
}

function paymentMonths(
  count: number,
  anchor: { year: number; month: number; day: number },
  fromToday: boolean,
): Array<{ payYear: string; payMonth: string }> {
  let cursor: Date;
  if (fromToday) {
    cursor = new Date(Date.UTC(anchor.year, anchor.month - 1, anchor.day));
  } else {
    const previous =
      anchor.month === 1
        ? { year: anchor.year - 1, month: 12 }
        : { year: anchor.year, month: anchor.month - 1 };
    cursor = new Date(Date.UTC(previous.year, previous.month - 1, 1));
  }

  const rows: Array<{ payYear: string; payMonth: string }> = [];
  for (let index = 0; index < count; index += 1) {
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
    cursor.setUTCDate(1);
    const year = cursor.getUTCFullYear();
    const month = cursor.getUTCMonth() + 1;
    rows.push({
      payYear: String(year).slice(-2),
      payMonth: String(month).padStart(2, "0"),
    });
  }
  return rows;
}

function fail(error: string): InstallmentFailure {
  return { ok: false, error };
}

function isSimulatorPayment(payments: number): payments is (typeof SIMULATOR_PAYMENTS)[number] {
  return (SIMULATOR_PAYMENTS as readonly number[]).includes(payments);
}

function isShopPayment(payments: number): payments is (typeof SHOP_PAYMENTS)[number] {
  return (SHOP_PAYMENTS as readonly number[]).includes(payments);
}

export function simulateInstallment(input: InstallmentRequest): InstallmentResult {
  const { amountYen, payments, service } = input;

  if (!Number.isInteger(amountYen)) {
    return fail("이용 금액은 1엔 단위의 정수여야 합니다.");
  }
  if (amountYen < 500 || amountYen > 10_000_000) {
    return fail("이용 금액은 500엔 이상 1,000만엔 이하입니다.");
  }
  if (service !== "shop" && service !== "later") {
    return fail("이용 시점은 shop(매장에서 지정) 또는 later(나중에 변경)입니다.");
  }

  if (service === "later" && payments === 2) {
    return fail("나중에 분할은 2회를 선택할 수 없습니다. 2회 무이자 분할은 매장에서 결제할 때만 가능합니다.");
  }
  if (service === "shop" && !isShopPayment(payments)) {
    return fail(`결제 횟수는 ${SHOP_PAYMENTS.join(", ")}회 중 하나여야 합니다.`);
  }
  if (service === "later" && !isSimulatorPayment(payments)) {
    return fail(`결제 횟수는 ${SIMULATOR_PAYMENTS.join(", ")}회 중 하나여야 합니다.`);
  }

  const hasYear = input.firstPaymentYear !== undefined;
  const hasMonth = input.firstPaymentMonth !== undefined;
  if (hasYear !== hasMonth) {
    return fail("첫 결제 연도와 월은 함께 지정합니다.");
  }
  if (
    input.firstPaymentYear !== undefined &&
    (!Number.isInteger(input.firstPaymentYear) ||
      input.firstPaymentYear < 2000 ||
      input.firstPaymentYear > 2100)
  ) {
    return fail("첫 결제 연도는 2000년부터 2100년 사이입니다.");
  }
  if (
    input.firstPaymentMonth !== undefined &&
    (!Number.isInteger(input.firstPaymentMonth) ||
      input.firstPaymentMonth < 1 ||
      input.firstPaymentMonth > 12)
  ) {
    return fail("첫 결제 월은 1부터 12까지입니다.");
  }

  const feeTotal =
    service === "later"
      ? Math.floor(amountYen * LATER_TOTAL_RATE[payments]!)
      : payments === 2
        ? 0
        : Math.floor(amountYen * SHOP_PER_PAYMENT_RATE * payments);

  const payAmountTotal = amountYen + feeTotal;
  const payAfterSecondTime = Math.floor(payAmountTotal / payments);
  const payFirstTime = payAmountTotal - payAfterSecondTime * (payments - 1);
  const feeAverage = Math.floor(feeTotal / payments);
  const denominator = ((payments + 1) * payments) / 2;

  const months =
    hasYear && hasMonth
      ? paymentMonths(
          payments,
          {
            year: input.firstPaymentYear!,
            month: input.firstPaymentMonth!,
            day: 1,
          },
          false,
        )
      : paymentMonths(payments, tokyoYmd(input.now ?? new Date()), true);

  let allocatedFee = 0;
  let balance = payAmountTotal;
  const schedule: ScheduleRow[] = [];

  for (let index = 0; index < payments; index += 1) {
    const feeEachTimes = Math.floor(
      (feeTotal / denominator) * (payments - index),
    );
    allocatedFee += feeEachTimes;
    const payAmount = index === 0 ? payFirstTime : payAfterSecondTime;
    balance -= payAmount;
    const month = months[index]!;
    schedule.push({
      times: index + 1,
      payYear: month.payYear,
      payMonth: month.payMonth,
      payAmount,
      principal: Math.round(payAmount - feeEachTimes),
      feeEachTimes,
      balanceAfterPay: balance,
    });
  }

  const first = schedule[0]!;
  first.feeEachTimes += feeTotal - allocatedFee;
  first.principal = payFirstTime - first.feeEachTimes;

  const today = tokyoYmd(input.now ?? new Date());
  const nextMonth =
    today.month === 12
      ? { year: today.year + 1, month: 1 }
      : { year: today.year, month: today.month + 1 };
  const firstMonth = schedule[0]!;
  const followsNextMonth =
    firstMonth.payYear === String(nextMonth.year).slice(-2) &&
    firstMonth.payMonth === String(nextMonth.month).padStart(2, "0");
  const notes = [
    "공식 분할납부 시뮬레이터와 같은 계산식입니다. 실제 청구와 다를 수 있는 참고 금액입니다.",
    "인출일은 매월 27일입니다.",
  ];
  if (hasYear) {
    notes.push("표의 월은 지정한 첫 결제월부터입니다.");
  } else if (followsNextMonth) {
    notes.push("표의 첫 달은 일본 시간 기준 다음 달입니다.");
  } else {
    notes.push("오늘은 31일이라 공식 스크립트와 같이 표의 첫 달이 한 달 건너뛴 달입니다.");
  }
  if (payments === 2) {
    notes.push(
      "2회 무이자 분할은 매장에서 결제할 때만 가능합니다. 공식 화면의 횟수 선택은 3회부터이고, 이 결과는 공개된 2회 무료 규칙을 적용한 것입니다.",
    );
  }
  if (service === "shop" && payments > 24) {
    notes.push("아메리칸 익스프레스 카드의 매장 분할은 3회부터 24회까지입니다.");
  }

  return {
    ok: true,
    amountYen,
    payments,
    service,
    serviceLabelJa: service === "shop" ? "お店で分割払い" : "あとから分割払い",
    serviceLabelKo: service === "shop" ? "매장에서 분할납부" : "나중에 분할납부",
    annualRatePercent: service === "shop" ? SHOP_APR[payments]! : "17.64",
    feePer100Yen: service === "shop" ? SHOP_FEE_PER_100[payments]! : LATER_FEE_PER_100[payments]!,
    feeTotal,
    feeAverage,
    payAmountTotal,
    payFirstTime,
    payAfterSecondTime,
    debitDay: 27,
    schedule,
    notes,
  };
}
