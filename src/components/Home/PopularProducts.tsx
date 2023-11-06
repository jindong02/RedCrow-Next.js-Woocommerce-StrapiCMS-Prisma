import React from "react";
import ProductCard2 from "../Shop/ProductCard2";
import { api } from "~/utils/api";

// const products: IProduct[] = [
//   {
//     name: "Clutch with floral pattern",
//     images: [{ src: img1 }, { src: img8 }],
//     price: "195 000",
//   },
//   {
//     name: "Clutch with floral pattern",
//     images: [{ src: img2 }, { src: img5 }],
//     price: "195 000",
//   },
//   {
//     name: "Clutch with floral pattern",
//     images: [{ src: img3 }, { src: img4 }],
//     price: "195 000",
//   },
//   {
//     name: "Clutch with floral pattern",
//     images: [{ src: img4 }],
//     price: "195 000",
//   },
//   {
//     name: "Clutch with floral pattern",
//     images: [{ src: img5 }],
//     price: "195 000",
//   },
//   {
//     name: "Clutch with floral pattern",
//     images: [{ src: img6 }],
//     price: "195 000",
//   },
//   {
//     name: "Clutch with floral pattern",
//     images: [{ src: img7 }],
//     price: "195 000",
//   },
//   {
//     name: "Clutch with floral pattern",
//     images: [{ src: img8 }],
//     price: "195 000",
//   },
// ];

const PopularProducts = () => {
  const { data: products } = api.product.getAll.useQuery({
    categoryId: undefined,
  });
  return (
    <div className="my-6">
      <h1 className="mb-4 text-xl font-bold uppercase">popular items</h1>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {products &&
          products.map((prod, i) => (
            <ProductCard2 key={i} product={prod} />
            // <div key={i}>Prod</div>
          ))}
      </div>
    </div>
  );
};

export default PopularProducts;
