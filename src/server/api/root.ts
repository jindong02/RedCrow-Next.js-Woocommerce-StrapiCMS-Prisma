import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { productRouter } from "./routers/product";
import { cartRouter } from "./routers/cart";
import { paymentRouter } from "./routers/payment";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  product: productRouter,
  cart: cartRouter,
  payment: paymentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
