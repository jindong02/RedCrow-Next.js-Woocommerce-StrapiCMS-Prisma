import type { CartItem } from "@prisma/client";
// import type { CartItem } from "../types/cart";
// import { type CartItemGuest } from "../types/cart";

// import { api } from "../utils/api";
import { type Product } from "~/types/WooCommerceTypes";
import { useCart } from "../context/CartContext";

export const useCartActions = () => {
  // const utils = api.useContext();
  const {
    increaseQuantity: addItemsGuest,
    deleteGuestItem,
    clearCart: clearGuestCart,
  } = useCart();
  // const { data: sessionData } = useSession();
  // const userId = sessionData?.user?.id;
  const userId = null;
  // const cartUser = api.cart.getUserCart.useQuery(undefined, {
  //   enabled: false,
  // });

  //   Mutations w/ optimistic updates
  // const addNewToCart = api.cart.addNewItem.useMutation({
  //   onMutate: async (el: {
  //     item: {
  //       id: number;
  //       name: string;
  //       price: string;
  //       images: { id: number; src: string; alt: string }[];
  //     };
  //     quantity: number;
  //     price: number;
  //     attributes: { name: string; option: string }[];
  //   }) => {
  //     await utils.cart.getCartItems.cancel();
  //     const prevData = utils.cart.getCartItems.getData();

  //     const newItem = {
  //       id: (Math.random() + 1).toString(36).substring(7),
  //       product: el.item,
  //       productId: el.item.id,
  //       quantity: el.quantity,
  //       cart: cartUser.data,
  //       cartId: cartUser?.data?.id,
  //     };
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     utils.cart.getCartItems.setData(undefined, (old) => [...old, newItem]);
  //     return { prevData };
  //   },
  //   onError(err, newPost, ctx) {
  //     if (ctx) utils.cart.getCartItems.setData(undefined, ctx.prevData);
  //   },
  //   onSettled: async () => {
  //     await utils.cart.getCartItems.invalidate();
  //   },
  // });

  // const incrementItemMut = api.cart.incrementItem.useMutation({
  //   async onMutate(el: { id: string }) {
  //     await utils.cart.getCartItems.cancel();
  //     const prevData = utils.cart.getCartItems.getData();

  //     utils.cart.getCartItems.setData(undefined, (old) => {
  //       if (!old) return;
  //       return old.map((item) => {
  //         if (item.id === el.id) {
  //           return { ...item, quantity: item.quantity + 1 };
  //         } else {
  //           return item;
  //         }
  //       });
  //     });
  //     return { prevData };
  //   },
  //   onError(err, newPost, ctx) {
  //     if (ctx) utils.cart.getCartItems.setData(undefined, ctx.prevData);
  //   },
  //   onSettled: async () => {
  //     await utils.cart.getCartItems.invalidate();
  //   },
  // });

  // const decrementItemMut = api.cart.decrementItem.useMutation({
  //   async onMutate(el: { id: string }) {
  //     await utils.cart.getCartItems.cancel();
  //     const prevData = utils.cart.getCartItems.getData();

  //     utils.cart.getCartItems.setData(undefined, (old) => {
  //       if (!old) return;
  //       return old.map((item) => {
  //         if (item.id === el.id) {
  //           return { ...item, quantity: item.quantity - 1 };
  //         } else {
  //           return item;
  //         }
  //       });
  //     });
  //     return { prevData };
  //   },
  //   onError(err, newPost, ctx) {
  //     if (ctx) utils.cart.getCartItems.setData(undefined, ctx.prevData);
  //   },
  //   onSettled: async () => {
  //     await utils.cart.getCartItems.invalidate();
  //   },
  // });

  // const deleteItemMut = api.cart.deleteItem.useMutation({
  //   async onMutate(el: { id: string }) {
  //     await utils.cart.getCartItems.cancel();
  //     const prevData = utils.cart.getCartItems.getData();
  //     const newItems = prevData?.filter((item) => item.id !== el.id);
  //     utils.cart.getCartItems.setData(undefined, () => newItems);
  //     return { prevData };
  //   },
  //   onError(err, newPost, ctx) {
  //     if (ctx) utils.cart.getCartItems.setData(undefined, ctx.prevData);
  //   },
  //   onSettled: async () => {
  //     await utils.cart.getCartItems.invalidate();
  //   },
  // });

  // const removeCart = api.cart.removeCart.useMutation({
  //   async onMutate() {
  //     await utils.cart.getCartItems.cancel();
  //     const prevData = utils.cart.getCartItems.getData();
  //     utils.cart.getCartItems.setData(undefined, () => []);
  //     return { prevData };
  //   },
  //   onError(err, newPost, ctx) {
  //     utils.cart.getCartItems.setData(undefined, ctx?.prevData);
  //   },
  //   onSettled() {
  //     utils.cart.getCartItems.invalidate();
  //   },
  //   onSuccess() {
  //     utils.cart.getUserCart.refetch();
  //   },
  // });

  // Handlers
  const clearCart = () => {
    if (!userId) return clearGuestCart();
    // return removeCart.mutate();
  };

  // const transferItems = api.cart.addCartItems.useMutation({
  //   async onMutate(
  //     items: {
  //       product: {
  //         id: number;
  //         name: string;
  //         price: string;
  //       };
  //       quantity: number;
  //       price: number;
  //       attributes: { name: string; option: string }[];
  //     }[]
  //   ) {
  //     await utils.cart.getCartItems.cancel();
  //     const prevData = utils.cart.getCartItems.getData();
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     //@ts-ignore
  //     utils.cart.getCartItems.setData(undefined, (old) => {
  //       if (!old) return items;
  //       return [...old, items];
  //     });
  //     return { prevData };
  //   },
  //   onError(err, newPost, ctx) {
  //     // If the mutation fails, use the context-value from onMutate
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     utils.cart.getCartItems.setData(undefined, ctx.prevData);
  //   },
  //   onSettled() {
  //     utils.cart.getCartItems.invalidate();
  //   },
  // });

  // const addItemsToUserCart = (cartItems: CartItemGuest[]) => {
  //   // transferItems.mutate(cartItems);
  // };

  const addToCartHandler = (
    el: Product,
    quantity: number,
    price: number,
    attributes: { name: string; option: string }[],
    variationNumber: number
  ) => {
    // console.log("Adding to cart...");
    if (!userId) {
      // console.log("no user");
      return addItemsGuest(el, quantity, price, attributes, variationNumber);
    }
    // addToCartRegulator({ item: el, quantity, price, attributes });
  };

  // const incrementItem = (el: CartItem) => {
  //   // return incrementItemMut.mutate({ id: el.id });
  // };

  const decrementItem = (el: CartItem) => {
    if (el.quantity == 1) {
      // return deleteItemMut.mutate({ id: el.id });
    }
    // return decrementItemMut.mutate({ id: el.id });
  };

  const removeItem = (id: string) => {
    if (!userId) {
      return deleteGuestItem(id);
    }
    // return deleteItemMut.mutate({ id });
  };

  //   const createCheckOutSession = async (
  //     cartItems: { product: Product; qty: number }[] | undefined
  //   ) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     const stripe = await getStripe();
  //     if (!stripe) return;
  //     console.log("===========");
  //     console.log(cartItems);
  //     console.log("===========");

  //     const checkoutSession = await axios.post("/api/checkout_sessions", {
  //       items: cartItems,
  //     });

  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  //     const result = await stripe.redirectToCheckout({
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  //       sessionId: checkoutSession.data.id,
  //     });

  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //     if (result?.error) alert(result.error.message);
  //   };

  // Regulators
  // const addToCartRegulator = ({
  //   item,
  //   quantity,
  //   price,
  //   attributes,
  // }: {
  //   item: Product;
  //   quantity: number;
  //   price: number;
  //   attributes: { name: string; option: string }[];
  // }) => {
  //   // return addNewToCart.mutate({ item, quantity, price, attributes });
  // };

  return {
    addToCartHandler,
    // incrementItem,
    decrementItem,
    removeItem,
    // addItemsToUserCart,
    // deleteOne,
    clearCart,
    // createCheckOutSession,
  };
};
