import { HeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { type Product } from "~/types/WooCommerceTypes";
import { type IFilterSlugIDComb } from "./FilterSidebar";
import { api } from "~/utils/api"

const ProductCard2 = ({ product, filterArry2 }: { product: Product | undefined, filterArry2: IFilterSlugIDComb[] }) => {
  // console.log("Jin Dong", filterArry2 && filterArry2.length);
  const [isHovered, setIsHovered] = useState(false);
  let productImage = product && product.images && product.images[1]?.src

  const id = product?.id;
  if (id && filterArry2 && filterArry2.length > 0) {
    
    const { data: variations } = api.product.getOneVariations.useQuery({ id });
    
    if (variations) {
      const idx = variations?.findIndex((vari) =>
        vari.attributes.some((atr) => atr.option === filterArry2[0]?.termName && parseFloat(vari?.price) > 0)
      );

      if (idx !== -1) {
        productImage = variations[idx]?.image?.src || ''
      } else {
        return <></>
      }
    }
  }

  return (
    <div className="relative">
      {/* img */}
      <div className="relative mb-4 cursor-pointer overflow-hidden transition duration-300">
        <div
          className="group aspect-w-1 aspect-h-1 transition duration-300 "
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {product ? (
            <Link
              href={`/shop/${product.id}`}
              className=" w-full overflow-hidden"
            >
              <Image
                alt="product image"
                src={productImage || ""}
                width={316}
                height={316}
                style={{ objectFit: "cover" }}
                className={`absolute top-0 left-0 h-full w-full transition duration-200 ${
                  isHovered && product.images && product.images[1]?.src
                    ? "opacity-0"
                    : "opacity-100 hover:scale-110"
                }`}
              />
              {product.images && product.images[1]?.src && (
                <Image
                  alt="product image"
                  src={
                    (product.images && product.images[1]?.src) ||
                    (product.images && product.images[0]?.src) ||
                    ""
                  }
                  width={316}
                  height={316}
                  style={{ objectFit: "cover" }}
                  className={`absolute top-0 left-0 h-full w-full transition duration-200 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
            </Link>
          ) : (
            <Skeleton borderRadius={0} height={316} />
          )}
        </div>
        <HeartIcon className="absolute top-2 right-2 h-8 w-8 text-white hover:fill-white" />
      </div>
      {/* Title */}
      <h2 className="text-center font-light lg:text-lg xl:text-xl">
        {product?.name || <Skeleton />}
      </h2>
      {/* Price */}
      {product ? (
        <h4
          className="text-center font-bold lg:text-lg xl:text-xl"
          dangerouslySetInnerHTML={{ __html: product.price_html }}
        ></h4>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default ProductCard2;
