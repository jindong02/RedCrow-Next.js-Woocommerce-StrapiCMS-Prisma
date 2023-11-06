import { XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
// import { useState } from "react";
import { useCart } from "~/context/CartContext";
import { type CartItemGuest } from "~/types/cart";
import { intToKZT } from "~/utils/helpers";

// function getTotalPrice(htmlStr: string, oldPrice: string, qty: number) {
//   // console.log(htmlStr);
//   const newPrice = qty * parseInt(oldPrice);
//   return htmlStr.replace(
//     formatToKazakhstanCurrency(parseInt(oldPrice)),
//     formatToKazakhstanCurrency(newPrice)
//   );
// }

const CartProduct = ({
  cartItem,
  className = "",
  isDropdownCart = false,
}: {
  cartItem: CartItemGuest;
  className?: string;
  isDropdownCart?: boolean;
}) => {
  // const [count, setCount] = useState(cartItem.quantity);
  const { increaseQuantity, decreaseQuantity, deleteGuestItem } = useCart();

  if (!cartItem) return null;
  return (
    <div className={`pt-7 pb-1 ${className}`}>
      <div className={`relative flex items-start space-x-4`}>
        {/* img */}
        <div className="aspect-1 max-w-[128px] cursor-pointer overflow-hidden transition duration-300 md:w-44 md:min-w-[176px]">
          <Link
            href={`/shop/${cartItem.product.id}`}
            className="w-full overflow-hidden"
          >
            <Image
              alt="product image"
              src={
                (cartItem.product.images[0] &&
                  cartItem.product.images[0].src) ||
                ""
              }
              className="relative w-full transition duration-300 hover:scale-110"
              width={400}
              height={400}
            />
          </Link>
        </div>
        {/* content */}
        <div className="flex h-44 grow flex-col">
          <div className="flex items-start justify-between">
            <h2 className="font-light md:text-lg">{cartItem.product.name}</h2>
            {!isDropdownCart && (
              <XMarkIcon
                onClick={() => {
                  deleteGuestItem(cartItem.id);
                }}
                className="hidden h-5 w-5 flex-shrink-0 cursor-pointer duration-200 hover:text-red-500 md:block"
              />
            )}
          </div>

          <div className="flex items-start justify-between">
            <h4
              className=" font-bold lg:text-lg"
              // dangerouslySetInnerHTML={{ __html: cartItem.product.price_html }}
            >
              {intToKZT(cartItem.price)}
            </h4>
          </div>

          {/* Bottom */}
          <div
            className={`mt-auto tracking-[1.5px] ${
              !isDropdownCart && "2xl:w-2/5"
            }`}
          >
            {cartItem.attributes &&
              cartItem.attributes.map((atr, i) => (
                <div key={i} className="grid grid-cols-2">
                  <h5 className="overflow-hidden overflow-ellipsis text-xs font-semibold md:text-base">
                    {atr.name}
                  </h5>
                  <h6 className="overflow-hidden overflow-ellipsis text-xs md:text-base">
                    {atr.option}
                  </h6>
                </div>
              ))}
            <div className="mt-auto grid grid-cols-2">
              <h5 className="text-xs font-semibold md:text-base">Quantity</h5>
              <div className="flex select-none items-center space-x-1 text-xs md:text-base">
                <MinusIcon
                  onClick={() => {
                    // setCount(count - 1);
                    decreaseQuantity(cartItem.id);
                  }}
                  className="h-3 w-3 cursor-pointer"
                />
                <span className="">{cartItem.quantity}</span>
                <PlusIcon
                  onClick={() => {
                    // setCount(count + 1);
                    increaseQuantity(
                      cartItem.product,
                      1,
                      cartItem.price,
                      cartItem.attributes,
                      cartItem.variationNumber
                    );
                  }}
                  className="h-3 w-3 cursor-pointer "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h4
        className=" text-right font-bold lg:text-lg"
        // dangerouslySetInnerHTML={{
        //   __html: getTotalPrice(
        //     cartItem.product.price_html,
        //     cartItem.product.price,
        //     cartItem.quantity
        //   ),
        // }}
      >
        {intToKZT(cartItem.price * cartItem.quantity)}
      </h4>
    </div>
  );
};

export default CartProduct;
