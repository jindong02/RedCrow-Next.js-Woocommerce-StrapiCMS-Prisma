/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Breadcrumb from "~/components/Shop/Breadcrumb";
import ThumbSwiper from "~/components/Shop/ThumbSwiper/ThumbSwiper";
import Tabs from "~/components/Shop/Tabs";
import img1 from "../../../public/assets/to_be_removed/prod_01.png";
import img2 from "../../../public/assets/to_be_removed/prod_02.png";
import img3 from "../../../public/assets/to_be_removed/prod_03.png";
import { type IDropBoxItem } from "~/components/Shop/Dropbox";
import YouMayAlsoLike from "~/components/Shop/YouMayAlsoLike";
import { type IProduct } from "~/types/product";
import BorderDropbox from "~/components/Shop/BorderDropbox";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Skeleton from "react-loading-skeleton";
import { useCartActions } from "~/hooks/useCartActions";
import type { Attribute_Variation } from "~/types/WooCommerceTypes";
import { intToKZT, objArraysAreEqual } from "~/utils/helpers";

const products: IProduct[] = [
  {
    name: "Clutch with floral pattern",
    images: [{ src: img1 }, { src: img3 }],
    price: "195 000",
  },
  {
    name: "Clutch with floral pattern",
    images: [{ src: img2 }, { src: img3 }],
    price: "195 000",
  },
  {
    name: "Clutch with floral pattern",
    images: [{ src: img3 }, { src: img1 }],
    price: "195 000",
  },
  {
    name: "Clutch with floral pattern",
    images: [{ src: img2 }],
    price: "195 000",
  },
  {
    name: "Clutch with floral pattern",
    images: [{ src: img3 }],
    price: "195 000",
  },
];

function arrayEquals(a: unknown, b: unknown) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

const ProductPage = () => {
  const router = useRouter();
  const id = parseInt(router.query.id as string);
  const { data: product, isLoading } = api.product.getOne.useQuery({ id });
  
  const { data: variations, isLoading: isLoadingVar } =
    api.product.getOneVariations.useQuery({
      id,
    });
    console.log("variations =========>>>>>>>>>>>>>>", variations);
  const [currentPrice, setCurrentPrice] = useState<number | undefined>(
    undefined
  );
  const [currentVarIdx, setcurrentVarIdx] = useState<number | undefined>(
    undefined
  );
  const [currentAttrList, setcurrentAttrList] = useState<
    Attribute_Variation[] | undefined
  >(undefined);
  const [variationImg, setVariationImg] = useState<string | undefined>(
    undefined
  );
  const [thumbImgs, setThumbImgs] = useState<string[] | undefined>(undefined);
  useEffect(() => {
    const options =
      product && product.attributes.map((attr) => attr.options[0]);

    const idx =
      options &&
      variations?.findIndex(
        (vari) =>
          options &&
          arrayEquals(
            vari.attributes.map((atr) => atr.option),
            options
          )
      );

    variations &&
      idx != undefined &&
      setcurrentAttrList(variations[idx]?.attributes);
    variations && idx != undefined && setcurrentVarIdx(idx);
    product && setThumbImgs(product?.images.map((img) => img.src));
  }, [isLoading, isLoadingVar]);

  useEffect(() => {
    if (variations && currentVarIdx != undefined) {
      setCurrentPrice(parseInt(variations[currentVarIdx]?.price || "0"));
      setVariationImg(variations[currentVarIdx]?.image.src || undefined);
    }
  }, [currentVarIdx]);

  useEffect(() => {
    if (variationImg && product) {
      if (variationImg != product.images[0]?.src)
        setThumbImgs([variationImg, ...product.images.map((img) => img.src)]);
      else setThumbImgs(product.images.map((img) => img.src));
    }
  }, [variationImg]);

  function onChangeAttributeVal(name: string, newVal: string) {
    if (!variations || currentVarIdx == undefined || !currentAttrList) return;
    // Search the right index according to the new changed value
    //    Keep in mind that currentAttrList is saved
    console.log("variations => ", variations);
    const newArr = currentAttrList.map((attr) => {
      if (attr.name == name) return { ...attr, option: newVal };
      else return { ...attr };
    });

    // Now we need to find the index
    const idx = variations.findIndex((veri) =>
      objArraysAreEqual(veri.attributes, newArr)
    );

    // Update the 3 states
    setcurrentAttrList(variations[idx]?.attributes);
    setcurrentVarIdx(idx);
  }
  // Cart
  const { addToCartHandler } = useCartActions();

  if (isLoading && isLoadingVar) return <p>loading...</p>;
  if (!product) return null;

  const attributesComponent = product.attributes?.map((attr, i) => (
    <React.Fragment key={`prod-item-${i}`}>
      <h6
        key={`${attr.name}-${i}`}
        className="mt-6 text-base font-semibold uppercase tracking-[1px]"
      >
        {attr.name}
      </h6>
      <BorderDropbox
        key={`B-${attr.name}-${i}`}
        currentAttr={attr.name}
        // list={
        //   attr.options.map((opt, i) => ({ id: i, name: opt })) as IDropBoxItem[]
        // }
         list={
           attr.options.map((opt, i) => {
             const idx = variations?.findIndex((vari) =>
             vari.attributes.some((atr) => atr.option === opt && parseFloat(vari?.price) > 0)
             );
             if (idx !== -1) {
               return { id: i, name: opt } as IDropBoxItem;
             } else {
               return null
             }
           })
           .filter((item): item is IDropBoxItem => item !== null)
        }
        onSelect={onChangeAttributeVal}
        className="w-full"
      />
    </React.Fragment>
  ));

  return (
    <>
      <Head>
        <title>Redcrow - {product?.name || "loading..."}</title>
      </Head>
      <Breadcrumb push={product?.name || ""} />
      <div className="mt-6">
        <div className="space-x-0 sm:flex sm:space-x-5">
          <div className="!w-full sm:!w-[60%]">
            {product ? (
              <ThumbSwiper
                images={thumbImgs || product?.images.map((img) => img.src)}
              />
            ) : (
              <Skeleton height={300} />
            )}
          </div>
          {/* Content */}
          <div className="mt-4 sm:mt-0 sm:w-[50%]">
            {/* Title */}
            <h1 className="text-2xl font-light">
              {product?.name || <Skeleton />}
            </h1>

            {/* Price */}
            {product ? (
              <h2
                className="mt-2 mb-12 text-2xl font-medium"
                // dangerouslySetInnerHTML={{ __html: product?.price_html }}
              >
                {intToKZT(currentPrice || 0)}
              </h2>
            ) : (
              <Skeleton />
            )}

            {/* description */}
            {product ? (
              <p
                className="mb-4 w-2/3 text-base font-normal"
                dangerouslySetInnerHTML={{ __html: product?.description }}
              ></p>
            ) : (
              <Skeleton />
            )}
            {attributesComponent}
            {/* <h6 className="text-base font-semibold uppercase tracking-[1px]">
              colour
            </h6>
            <BorderDropbox
              list={colorOptions}
              onSelect={setColorOpt}
              className="w-full"
            />
            <h6 className="mt-14 text-base font-semibold uppercase tracking-[1px]">
              Size
            </h6>
            <BorderDropbox
              list={sizeOptions}
              onSelect={setSizeOpt}
              className="w-1/2 md:w-1/4"
            /> */}
            {/* Add to cart */}
            <button
              onClick={() => {
                // console.log("lol");
                addToCartHandler(
                  product,
                  1,
                  currentPrice || 0,
                  currentAttrList || [],
                  product.variations[currentVarIdx || 0] || 0
                );
              }}
              className="mt-10 block w-full bg-black px-16 py-3 text-xl font-light text-white transition duration-200 hover:bg-main"
            >
              Add To Bag
            </button>
          </div>
        </div>
        <Tabs />
        {/* You may also like */}
        <div>
          <h5 className="mb-2 text-base font-semibold">You may also like…</h5>
          <YouMayAlsoLike products={products} />
        </div>
        {/* Subscribe */}
        {/* <SubscribeSection /> */}
      </div>
    </>
  );
};

export default ProductPage;
