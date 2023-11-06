import { type AxiosResponse } from "axios";
import { z } from "zod";
import { env } from "~/env.mjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type Product } from "~/types/WooCommerceTypes";
import { type INavItem } from "~/types/navbar";
import type { IStrapiNavBar, IStrapiResponse } from "~/types/strapi";
import { fetchNavItems } from "~/utils/strapiApi";
import {
  createWooCommerceOrder,
  fetchWooCommerceOneProduct,
  fetchWooCommerceProducts,
  getWooCommerceOneProductVariations,
  wooCommerceGetAllCategories,
  wooCommerceGetCategoryId,
} from "~/utils/wooCommerceApi";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        categoryId: z.number().optional(),
        filterArr: z
          .object({
            slug: z.string(),
            termId: z.number(),
            termName: z.string(),
          })
          .array(),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        searchQuery: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { categoryId, filterArr, minPrice, maxPrice, searchQuery } = input;
      console.log(filterArr.length);
      if (filterArr.length == 0) {
        const res = await fetchWooCommerceProducts(
          categoryId,
          undefined,
          undefined,
          minPrice,
          maxPrice,
          searchQuery
        );
        return res;
      } else {
        const promises = filterArr.map(async (itm) => {
          return fetchWooCommerceProducts(
            categoryId,
            itm.slug,
            itm.termId,
            minPrice,
            maxPrice,
            searchQuery
          );
        });
        const results = await Promise.all(promises);
        console.log("results", results);
        const combined = results.flat() as Product[] | undefined;
        const ids = combined?.map(({ id }) => id);
        const filtered = combined?.filter(
          ({ id }, index) => !ids?.includes(id, index + 1)
        );
        // Filter
        const myNames = filterArr.map((filt) => filt.termName);
        const intersection = filtered?.filter((prod) => {
          const listOfOptions = prod.attributes
            .map((attr) => attr.options)
            .flat();

          return myNames.every((elem) => listOfOptions.includes(elem));
        });
        return intersection;
      }
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const res = await fetchWooCommerceOneProduct(input.id);
      return res?.data;
    }),
  getOneVariations: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const res = await getWooCommerceOneProductVariations(input.id);
      return res?.data;
    }),
  getCategoryId: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const res = await wooCommerceGetCategoryId(input.name);
      return res;
    }),
  getAllCategoryChildren: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const id = await wooCommerceGetCategoryId(input.name);
      const sub = await wooCommerceGetAllCategories(id);
      const res = [];
      if (sub)
        for (let i = 0; i < sub?.data.length; i++) {
          const collection = await wooCommerceGetAllCategories(
            sub?.data[i]?.id
          );
          res.push({
            sub: sub?.data[i],
            itsCollection: collection?.data || [],
          });
        }
      return res;
    }),
  getAllCategoriesOfParent: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const res = await wooCommerceGetAllCategories(input.id);
      return res;
    }),
  getNav: publicProcedure.query(async () => {
    const {
      data: navItmsData,
    }: AxiosResponse<IStrapiResponse<IStrapiNavBar[]>> = await fetchNavItems();

    const navIms: INavItem[] = navItmsData.data.map((navItm) => {
      const el = navItm.attributes;
      return {
        name: el.name,
        href: el.href,
        innerProducts: el.innerProducts.map((prod) => {
          return {
            name: prod.name,
            href: prod.href,
          };
        }),
        innerImgs: el.innerImgs.map((img) => {
          return {
            src: env.NEXT_PUBLIC_STRAPI_API_URL + img.image.data.attributes.url,
            href: img.href,
          };
        }),
      };
    });
    return navIms;
  }),
  createNewOrder: publicProcedure
    .input(
      z.object({
        order: z.object({
          payment_method: z.string(),
          payment_method_title: z.string(),
          // set_paid: z.boolean(),
          line_items: z
            .object({
              // id: z.number(),
              product_id: z.number(),
              quantity: z.number(),
              total: z.string(),
              subtotal: z.string(),
              // price: z.number(),
            })
            .array(),
          shipping: z.object({
            address_1: z.string(),
            address_2: z.string(),
            city: z.string(),
            company: z.string(),
            country: z.string(),
            email: z.string(),
            first_name: z.string(),
            last_name: z.string(),
            postcode: z.string(),
            state: z.string(),
          }),
          billing: z.object({
            address_1: z.string(),
            address_2: z.string(),
            city: z.string(),
            company: z.string(),
            country: z.string(),
            email: z.string(),
            first_name: z.string(),
            last_name: z.string(),
            postcode: z.string(),
            phone: z.string(),
            state: z.string(),
          }),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const res = await createWooCommerceOrder(input.order);
      return res;
    }),
});
