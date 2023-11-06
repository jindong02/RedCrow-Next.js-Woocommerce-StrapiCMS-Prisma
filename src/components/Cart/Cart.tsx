import React from "react";
import { motion } from "framer-motion";
import { useCart } from "~/context/CartContext";
import CartProduct from "./CartProduct";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { intToKZT } from "~/utils/helpers";
import Link from "next/link";

// import { type IProduct } from "~/types/product";
// import img1 from "../../../public/assets/to_be_removed/prod_01.png";
// import img2 from "../../../public/assets/to_be_removed/prod_02.png";
// import CartProduct from "./CartProduct";

// const products: IProduct[] = [
//   {
//     name: "Clutch with floral pattern",
//     images: [{ src: img1 }],
//     price: "195 000",
//   },
//   {
//     name: "Clutch with floral pattern",
//     images: [{ src: img2 }],
//     price: "195 000",
//   },
// ];

const Cart = ({
  isOpen,
  setIsCartOpen,
}: {
  isOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { cartItems: guestItems, totalAmount, getCartQuantity } = useCart();
  return (
    <motion.div
      key={isOpen ? "open" : null}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.2 }}
      className="w-full border border-[#BFBFBF] py-8 px-4 text-lg"
    >
      <div className="flex">
        <h5 className="">My Bag ({getCartQuantity()})</h5>
        <XMarkIcon
          className="ml-auto h-5 w-5 cursor-pointer"
          onClick={() => setIsCartOpen(false)}
        />
      </div>
      {guestItems &&
        guestItems?.map((cartItem, i) => {
          return (
            <React.Fragment key={`cart-item-${i}`}>
              <CartProduct
                className="py-7"
                key={`p-${i}`}
                cartItem={cartItem}
                isDropdownCart={true}
              />
              <div
                key={`divider-${i}`}
                className="h-[1px] w-full bg-[#BFBFBF]"
              ></div>
            </React.Fragment>
          );
        })}
      <div className="mt-2 flex items-center justify-between">
        <h3 className="text-base tracking-[1.5px]">Order Value</h3>
        <h5 className="text-lg font-bold">{intToKZT(totalAmount)}</h5>
      </div>
      <div className="my-2 flex items-center justify-between text-base tracking-[1.5px]">
        <h3 className="">Delivery</h3>
        <h5 className="">Free</h5>
      </div>
      <div className="h-[1px] w-full bg-[#BFBFBF]"></div>
      <div className="mt-5 mb-7 flex items-center justify-between">
        <h3 className="text-sm font-medium tracking-[1.5px]">TOTAL</h3>
        <h5 className="text-lg font-bold">{intToKZT(totalAmount)}</h5>
      </div>
      <Link href="/cart">
        <button
          onClick={() => {
            setIsCartOpen(false);
          }}
          className="w-full bg-black py-3.5 text-xl font-light text-white duration-200 hover:bg-main"
        >
          Go To Shopping Bag
        </button>
      </Link>
    </motion.div>
  );
};

export default Cart;
