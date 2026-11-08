import { defineEval, includes } from "@grok/agent-sdk/evals";

export default defineEval({
  tags: ["smoke"],
  description: "분할납부 도구 결과의 수수료와 회차 금액을 답에 옮긴다.",
  cases: [
    {
      id: "later-50000-3",
      description: "5만엔을 나중에 3회로 나누면 수수료 1475엔, 첫 회 17159엔이다.",
      async test(t) {
        await t.send("5만엔을 나중에 분할로 3회 내면 얼마야?");
        t.succeeded();
        t.calledTool("simulate-installment", {
          input: { amountYen: 50000, payments: 3, service: "later" },
        });
        t.check(t.reply, includes(/1,475|1475/));
        t.check(t.reply, includes(/17,159|17159/));
        t.check(t.reply, includes(/51,475|51475/));
      },
    },
    {
      id: "shop-50000-5",
      description: "5만엔을 매장에서 5회 내면 수수료 1700엔, 매회 10340엔이다.",
      async test(t) {
        await t.send("가게에서 5만엔을 5회로 분할하면 매달 얼마야?");
        t.succeeded();
        t.calledTool("simulate-installment", {
          input: { amountYen: 50000, payments: 5, service: "shop" },
        });
        t.check(t.reply, includes(/1,700|1700/));
        t.check(t.reply, includes(/10,340|10340/));
      },
    },
  ],
});
