import type { CartItem } from "@prisma/client";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const cartRouter = createTRPCRouter({
  getUserCart: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.prisma.cart.findUnique({
      where: { userId },
      select: {
        items: {
          select: {
            id: true,
            quantity: true,
            cart: true,
          },
        },
        id: true,
        userId: true,
      },
    });
  }),
  getCartItems: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.prisma.cartItem.findMany({
      where: { cart: { userId } },
      select: {
        quantity: true,
        id: true,
        cartId: true,
        cart: true,
        price: true,
      },
      orderBy: { id: "asc" },
    });
  }),
  addNewItem: protectedProcedure
    .input(
      z.object({
        item: z.object({
          id: z.number(),
          name: z.string(),
          price: z.string(),
          images: z.array(
            z.object({ id: z.number(), src: z.string(), alt: z.string() })
          ),
        }),
        attributes: z.array(
          z.object({
            name: z.string(),
            option: z.string(),
          })
        ),
        price: z.number(),
        quantity: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { item, quantity } = input;
      const { id, name, price, images } = item;
      // if item exists update its qty
      const exists: CartItem | null = await ctx.prisma.cartItem.findFirst({
        where: { cart: { userId }, productId: id },
      });
      if (exists) {
        return ctx.prisma.cartItem.update({
          where: { id: exists.id },
          data: {
            quantity,
          },
        });
      }
      // else create new item
      return ctx.prisma.cartItem.create({
        data: {
          quantity,
          cart: {
            connectOrCreate: {
              where: { userId },
              create: { userId },
            },
          },
          image: images[0]?.src || "",
          name,
          price,
          productId: id,
        },
      });
    }),
  incrementItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.cartItem.update({
        where: { id: input.id },
        data: {
          quantity: { increment: 1 },
        },
      });
    }),
  decrementItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.cartItem.update({
        where: { id: input.id },
        data: {
          quantity: { decrement: 1 },
        },
      });
    }),
  deleteItem: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.cartItem.delete({
        where: { id: input.id },
      });
    }),
  removeCart: protectedProcedure.mutation(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.prisma.cart.delete({
      where: { userId },
    });
  }),
  addCartItems: protectedProcedure
    .input(
      z
        .object({
          product: z.object({
            id: z.number(),
            name: z.string(),
            price: z.string(),
          }),
          quantity: z.number(),
          attributes: z.array(
            z.object({
              name: z.string(),
              option: z.string(),
            })
          ),
          price: z.number(),
        })
        .array()
    )
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const data = input.map((item) => {
        return {
          quantity: item.quantity,
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
        };
      });
      return ctx.prisma.cart.upsert({
        where: { userId },
        create: {
          userId,
          items: {
            createMany: {
              data,
            },
          },
        },
        update: {
          items: {
            createMany: {
              data,
            },
          },
        },
      });
    }),
});
