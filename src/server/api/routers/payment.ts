import { z } from "zod";
import { type ICreatePayment, YooCheckout } from "@a2seven/yoo-checkout";
import { env } from "~/env.mjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { randUuid } from "@ngneat/falso";

export const paymentRouter = createTRPCRouter({
  createPaymentInYookassa: publicProcedure
    .input(
      z.object({
        summ: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const checkout = new YooCheckout({
        shopId: env.YOOKASSA_SHOP_ID,
        secretKey: env.YOOKASSA_SECRET_KEY,
      });
      const idempotenceKey = randUuid();

      const createPayload: ICreatePayment = {
        amount: {
          value: input.summ.toString(),
          currency: "RUB",
        },
        payment_method_data: {
          type: "yoo_money",
        },
        confirmation: {
          type: "redirect",
          return_url: "http://localhost:3000/success",
        },
        capture: true,
      };

      try {
        const payment = await checkout.createPayment(
          createPayload,
          idempotenceKey
        );

        return payment;
      } catch (error) {
        console.error(error);
      }
    }),
});
