import assert from "node:assert/strict";
import { simulateInstallment } from "./installment";

const later = simulateInstallment({
  amountYen: 50000,
  payments: 3,
  service: "later",
  now: new Date("2026-11-08T03:00:00.000Z"),
});
assert.equal(later.ok, true);
if (later.ok) {
  assert.equal(later.feeTotal, 1475);
  assert.equal(later.payAmountTotal, 51475);
  assert.equal(later.payFirstTime, 17159);
  assert.equal(later.payAfterSecondTime, 17158);
  assert.equal(later.feeAverage, 491);
  assert.deepEqual(
    later.schedule.map((row) => row.feeEachTimes),
    [739, 491, 245],
  );
  assert.deepEqual(
    later.schedule.map((row) => row.principal),
    [16420, 16667, 16913],
  );
  assert.deepEqual(
    later.schedule.map((row) => row.balanceAfterPay),
    [34316, 17158, 0],
  );
  assert.deepEqual(
    later.schedule.map((row) => `${row.payYear}/${row.payMonth}`),
    ["26/12", "27/01", "27/02"],
  );
}

const shop = simulateInstallment({
  amountYen: 50000,
  payments: 5,
  service: "shop",
  now: new Date("2026-11-08T03:00:00.000Z"),
});
assert.equal(shop.ok, true);
if (shop.ok) {
  assert.equal(shop.feeTotal, 1700);
  assert.equal(shop.payAmountTotal, 51700);
  assert.equal(shop.payFirstTime, 10340);
  assert.equal(shop.payAfterSecondTime, 10340);
  assert.equal(shop.feeAverage, 340);
  assert.equal(shop.schedule[0]?.feeEachTimes, 568);
}

const laptop = simulateInstallment({
  amountYen: 182520,
  payments: 12,
  service: "shop",
});
assert.equal(laptop.ok, true);
if (laptop.ok) {
  assert.equal(laptop.feeTotal, 14893);
  assert.equal(laptop.payAmountTotal, 197413);
  assert.equal(laptop.payFirstTime, 16452);
  assert.equal(laptop.payAfterSecondTime, 16451);
}

const monthEnd = simulateInstallment({
  amountYen: 1000,
  payments: 3,
  service: "shop",
  now: new Date("2026-01-30T15:00:00.000Z"),
});
assert.equal(monthEnd.ok, true);
if (monthEnd.ok) {
  assert.deepEqual(
    monthEnd.schedule.map((row) => `${row.payYear}/${row.payMonth}`),
    ["26/03", "26/04", "26/05"],
  );
}

const explicit = simulateInstallment({
  amountYen: 1000,
  payments: 3,
  service: "shop",
  firstPaymentYear: 2027,
  firstPaymentMonth: 1,
  now: new Date("2026-11-08T03:00:00.000Z"),
});
assert.equal(explicit.ok, true);
if (explicit.ok) {
  assert.equal(explicit.schedule[0]?.payYear, "27");
  assert.equal(explicit.schedule[0]?.payMonth, "01");
}

const two = simulateInstallment({ amountYen: 1001, payments: 2, service: "shop" });
assert.equal(two.ok, true);
if (two.ok) {
  assert.equal(two.feeTotal, 0);
  assert.equal(two.payFirstTime, 501);
  assert.equal(two.payAfterSecondTime, 500);
}

assert.equal(
  simulateInstallment({ amountYen: 499, payments: 3, service: "shop" }).ok,
  false,
);
assert.equal(
  simulateInstallment({ amountYen: 50000, payments: 4, service: "shop" }).ok,
  false,
);
assert.equal(
  simulateInstallment({ amountYen: 50000, payments: 2, service: "later" }).ok,
  false,
);

let negative = 0;
for (const service of ["shop", "later"] as const) {
  for (const payments of [3, 5, 6, 10, 12, 15, 18, 20, 24, 30, 36]) {
    const result = simulateInstallment({ amountYen: 500, payments, service });
    assert.equal(result.ok, true);
    if (!result.ok) continue;
    const principal = result.schedule.reduce((sum, row) => sum + row.principal, 0);
    const fee = result.schedule.reduce((sum, row) => sum + row.feeEachTimes, 0);
    assert.equal(principal, 500);
    assert.equal(fee, result.feeTotal);
    assert.equal(result.schedule.at(-1)?.balanceAfterPay, 0);
    if (result.schedule.some((row) => row.principal < 0)) negative += 1;
  }
}
assert.equal(negative, 0);

console.log("installment checks passed");
