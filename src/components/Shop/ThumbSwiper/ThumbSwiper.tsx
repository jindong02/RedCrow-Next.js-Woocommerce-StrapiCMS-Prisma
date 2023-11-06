/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, type Swiper as TSwiper } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import myStyles from "./thumbSwiper.module.css";
import Image, { type StaticImageData } from "next/image";

type ImageState = {
  isZoomed: boolean;
  cursorPos: { x: number; y: number };
};

const ThumbSwiper = ({ images }: { images: string[] | StaticImageData[] }) => {
  const thumbsSwiper = useRef<TSwiper | null>(null);
  const [imageStates, setImageStates] = useState<ImageState[]>(
    images.map(() => ({ isZoomed: false, cursorPos: { x: 0, y: 0 } }))
  );

  function handleMouseMove(
    e: React.MouseEvent<HTMLImageElement>,
    index: number
  ) {
    setImageStates((prevState) => {
      const newState = [...prevState];
      newState[index]!.cursorPos = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      };
      return newState;
    });
  }

  function handleMouseEnter(index: number) {
    setImageStates((prevState) => {
      const newState = [...prevState];
      newState[index]!.isZoomed = true;
      return newState;
    });
  }

  function handleMouseLeave(index: number) {
    setImageStates((prevState) => {
      const newState = [...prevState];
      newState[index]!.isZoomed = false;
      return newState;
    });
  }

  const content = (
    <>
      {images?.map((imag, i) => (
        <SwiperSlide className="aspect-1 select-none" key={i}>
          <div className="relative h-full">
            <Image
              className="h-full w-full cursor-crosshair object-contain"
              alt="product image"
              width={400}
              height={400}
              src={imag}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              onMouseMove={(e) => handleMouseMove(e, i)}
            />
            {imageStates[i]?.isZoomed && (
              <div
                className="pointer-events-none absolute z-50 border border-black bg-white"
                style={{
                  bottom: imageStates[i]!.cursorPos.y - 200,
                  right: imageStates[i]!.cursorPos.x - 200,
                  width: "400px",
                  height: "400px",
                  transform: `scale(4)`,
                  transformOrigin: "center center",
                  overflow: "hidden",
                }}
              >
                <Image
                  alt=""
                  src={imag}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover"
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </>
  );

  return (
    <div className="block max-h-[550px] w-full md:flex">
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#000",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper.current }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 mb-2 md:w-[80%]"
      >
        {content}
      </Swiper>
      {/* <div className="w-30 ml-4 h-full"> */}
      <Swiper
        onSwiper={(swiper) => (thumbsSwiper.current = swiper)}
        // onSlideChange={(swiper) => console.log("changed")}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        className="max-h-[540px] md:w-[17%]"
        direction={window.screen.width > 1057 ? "vertical" : "horizontal"}
        style={window.screen.width > 1057 ? { height: window.innerHeight } : {}}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images?.map((imag, i) => (
          <SwiperSlide className="aspect-1" key={i}>
            <Image
              className="h-full w-full object-cover"
              alt="product image"
              width={400}
              height={400}
              src={imag}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* </div> */}
    </div>
  );
};

export default ThumbSwiper;
