import { type StaticImageData } from "next/image";
import { type ReactNode } from "react";
import { type Product } from "./WooCommerceTypes";

export interface ICartImage {
  id?: number;
  src?: string | StaticImageData;
  alt?: string;
}

export interface ICartItem {
  id?: number;
  name?: string;
  slug?: string;
  price?: string;
  image?: ICartImage;
  size?: string;
  colour?: string;
}

export interface CartItem {
  id: string;
  quantity: number;
}

export type CartProviderProps = {
  children: ReactNode;
};

export type CartItemAttributes = {
  name: string;
  option: string;
};

export type CartItemGuest = {
  id: string;
  product: Product;
  cart: string;
  cartId: string;
  quantity: number;
  attributes: CartItemAttributes[];
  price: number;
  variationNumber: number;
};
export type CartContext = {
  // toggleCart: () => void;
  cartItems: CartItemGuest[];
  increaseQuantity: (
    item: Product,
    quantity: number,
    price: number,
    attributes: { name: string; option: string }[],
    variationNumber: number
  ) => void;
  getCartQuantity: () => number;
  decreaseQuantity: (id: string) => void;
  deleteGuestItem: (id: string) => void;
  clearCart: () => void;
  totalAmount: number;
};
