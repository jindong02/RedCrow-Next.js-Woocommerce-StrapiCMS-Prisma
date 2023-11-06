import { HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type Product } from "~/types/WooCommerceTypes";
import RatingStartsStatic from "./RaingStarsStatic";

const ProductCard = ({
  product,
  isDiscount = false,
}: {
  product: Product;
  isDiscount?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative">
      {/* Hot */}
      <div className="absolute top-2 left-2 z-30">
        {product.featured && (
          <p className="mb-1 flex h-5 w-11 items-center justify-center rounded-3xl bg-[#2BA968] font-secondary text-[10px] font-semibold text-white">
            HOT
          </p>
        )}
        {isDiscount && (
          <p className="flex h-5 w-11 items-center justify-center rounded-3xl bg-[#DA5555] font-secondary text-[10px] font-semibold text-white">
            20%
          </p>
        )}
      </div>
      {/* img */}
      <div
        // href="/shop/my-slug"
        className="group aspect-w-1 aspect-h-1 relative mb-4 cursor-pointer overflow-hidden transition duration-300 group-hover:brightness-75"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href="/shop/my-slug">
          <Image
            alt="product image"
            src={(product.images && product.images[0]?.src) || ""}
            width={300}
            height={300}
            className={`absolute top-0 left-0 transition duration-200 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          />
          <Image
            alt="product image"
            src={
              (product.images && product.images[1]?.src) ||
              (product.images && product.images[0]?.src) ||
              ""
            }
            width={300}
            height={300}
            className={`absolute top-0 left-0 transition duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        <div className="z-10 mt-auto !h-fit w-full translate-y-full transform-gpu opacity-0 transition duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          <button
            // onClick={() => console.log("clksd")}
            className={
              "w-full bg-black py-3 text-center text-[10px] font-bold text-white hover:bg-opacity-80"
            }
          >
            ADD TO CART
          </button>
        </div>
      </div>
      {/* Category */}
      <div className="flex items-center justify-between">
        <p className="font-secondary text-[10px] uppercase text-mygray">
          {product.categories?.map((category) => category.name).join(",")}
        </p>
        <HeartIcon className="h-5 w-5 text-mygray" />
      </div>
      {/* Title */}
      <h2 className="text-[15px]">{product.name}</h2>
      {/* Stars */}
      <RatingStartsStatic
        value={product.rating_count}
        className="h-3 w-3 text-mygray"
      />
      {/* Price */}
      <h4 className="font-secondary text-[18px] font-semibold">
        ${product.price}
      </h4>
    </div>
  );
};

export default ProductCard;
