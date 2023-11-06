import { type Cart } from "@prisma/client";
import { type CartItemGuest } from "~/types/cart";

export type CartItemPlus = {
  cart: Cart;
  price: string;
  id: string;
  quantity: number;
  cartId: string;
};

export const getTotalAmount = (items: CartItemGuest[] | undefined) => {
  let total = 0;
  items?.forEach((item) => {
    const itemTotal = item.quantity * Number(item?.price);
    total += itemTotal;
  });

  return total;
};
export const getTotalAmountPlus = (items: CartItemPlus[] | undefined) => {
  let total = 0;
  items?.forEach((item) => {
    const itemTotal = item.quantity * Number(item?.price);
    total += itemTotal;
  });

  return total;
};

export const intToKZT = (price: number) => {
  const formatter = new Intl.NumberFormat("en-KZ", {
    style: "currency",
    currency: "KZT",
    // minimumIntegerDigits: 3,
    minimumFractionDigits: 0,
  });

  return (
    formatter
      .format(price)
      .replace(/,/g, " ")
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .replace(formatter.formatToParts(0)[0]!.value, "") + " 〒"
  );
};

export function objArraysAreEqual(arr1: unknown, arr2: unknown) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

export function formatToKazakhstanCurrency(x: number) {
  const integerWithSeparators = x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return integerWithSeparators;
}
