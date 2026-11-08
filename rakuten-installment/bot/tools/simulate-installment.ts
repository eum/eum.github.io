import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import { simulateInstallment } from "../lib/installment";

export default defineTool({
  description:
    "라쿠텐 카드 분할납부 상환을 계산한다. 공식 시뮬레이터와 같은 식이다. 이용 금액(엔), 결제 횟수, 시점(shop=매장에서 지정, later=결제 후 변경)이 정해졌을 때 호출한다. 금액을 직접 계산하지 말고 이 결과를 그대로 전한다.",
  effect: "read",
  inputSchema: z.object({
    amountYen: z
      .number()
      .int()
      .describe("이용 예정 금액(엔). 500 이상 10000000 이하."),
    payments: z
      .number()
      .int()
      .describe(
        "결제 횟수. 매장 지정은 2, 3, 5, 6, 10, 12, 15, 18, 20, 24, 30, 36. 나중에 변경은 2를 제외한 같은 횟수.",
      ),
    service: z
      .enum(["shop", "later"])
      .describe("shop은 결제 시 분할 지정. later는 あとから分割(결제 후 변경)."),
    firstPaymentYear: z
      .number()
      .int()
      .optional()
      .describe("첫 결제 연도(서력). 생략하면 일본 시간 기준 다음 달."),
    firstPaymentMonth: z
      .number()
      .int()
      .min(1)
      .max(12)
      .optional()
      .describe("첫 결제 월. 연도와 함께 지정한다."),
  }),
  execute(input) {
    return simulateInstallment(input);
  },
});
