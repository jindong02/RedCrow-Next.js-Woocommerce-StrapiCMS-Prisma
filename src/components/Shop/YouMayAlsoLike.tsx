import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { type IProduct } from "~/types/product";

const YouMayAlsoLike = ({ products }: { products: IProduct[] }) => {
  if (!products) return null;

  return (
    <div className="w-full">
      <Swiper spaceBetween={23} slidesPerView={"auto"}>
        {products.map((item, i) => (
          <SwiperSlide
            key={i}
            className="group mb-9 max-w-[50%] md:max-w-[33%]"
          >
            {/* <ProductCard2 product={item} /> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default YouMayAlsoLike;
