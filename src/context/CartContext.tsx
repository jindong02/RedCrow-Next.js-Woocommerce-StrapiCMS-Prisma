/* eslint-disable react-hooks/exhaustive-deps */
import { useState, createContext, useContext, useEffect } from "react";
// import { CartMenu } from "../components/CartMenu";

import { randUuid } from "@ngneat/falso";
// import { type Product } from "@prisma/client";
import useLocalStorage from "../hooks/useLocalStorage";
// import { api } from "../utils/api";
// import { useSession } from "next-auth/react";
import {
  CartContext,
  type CartItemGuest,
  type CartProviderProps,
} from "../types/cart";
// import { getTotalAmount } from "../utils/helpers";
// import { useCartActions } from "../hooks/useCartActions";
import { getTotalAmount, objArraysAreEqual } from "~/utils/helpers";
import { type Product } from "~/types/WooCommerceTypes";

const CartContext = createContext({} as CartContext);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: CartProviderProps) {
  // const [isOpen, setIsOpen] = useState(false);
  // const { addItemsToUserCart } = useCartActions();
  const [cartItems, setCartItems] = useLocalStorage(
    "guestCart",
    [] as CartItemGuest[]
  );
  // const { data: cartItemsServer } = api.cart.getCartItems.useQuery();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    changeTotalAmount();
  }, [cartItems]);

  const changeTotalAmount = () => {
    setTotalAmount(Math.round(getTotalAmount(cartItems)));
  };

  // const { data: sessionData } = useSession();
  // const userId = sessionData?.user?.id;
  const userId = null;

  useEffect(() => {
    if (userId && cartItems && cartItems.length !== 0) {
      // addItemsToUserCart(cartItems);
      setCartItems([]);
    }
  }, [userId]);

  // const toggleCart = () => setIsOpen((prev) => !prev);

  const getCartQuantity = () =>
    cartItems?.reduce((acc, el) => el.quantity + acc, 0);

  const deleteGuestItem = (id: string) =>
    setCartItems((currItems) => currItems.filter((el) => el.id !== id));

  const decreaseQuantity = (id: string) => {
    return setCartItems((currItems) => {
      if (currItems.find((el) => el.id === id)?.quantity === 1) {
        return currItems.filter((el) => el.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const increaseQuantity = (
    item: Product,
    quantity: number,
    price: number,
    attributes: { name: string; option: string }[],
    variationNumber: number
  ) => {
    return setCartItems((currItems) => {
      const founIdx = currItems.findIndex(
        (el) =>
          el.product.id === item.id &&
          objArraysAreEqual(el.attributes, attributes)
      );
      const nonExistanceCondition = founIdx == -1;
      const attrArrayExist =
        founIdx != -1 &&
        !objArraysAreEqual(currItems[founIdx]?.attributes, attributes);
      if (nonExistanceCondition || attrArrayExist) {
        // Create new instance
        return [
          ...currItems,
          {
            id: randUuid(),
            product: item,
            cart: "guest",
            cartId: randUuid(),
            quantity: quantity,
            price: price,
            attributes: attributes || [],
            variationNumber: variationNumber,
          },
        ];
      } else {
        return currItems.map((el) => {
          if (
            el.product.id === item.id &&
            objArraysAreEqual(el.attributes, attributes)
          ) {
            return { ...el, quantity: el.quantity + quantity };
          } else {
            return el;
          }
        });
      }
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        // toggleCart,
        cartItems,
        increaseQuantity,
        getCartQuantity,
        decreaseQuantity,
        deleteGuestItem,
        clearCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
