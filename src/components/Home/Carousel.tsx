// import "swiper/css/navigation";
import Image from "next/image";
// import HeaderIMG from "../../../public/assets/to_be_removed/slide1.jpg";
import LOGOIMG from "../../../public/assets/logo-white.svg";
import { env } from "~/env.mjs";
// import { env } from "~/env.mjs";

const Carousel = ({ heroImg }: { heroImg: string }) => {
  const imgSrc = env.NEXT_PUBLIC_STRAPI_API_URL + heroImg;
  return (
    <>
      <div className=" relative">
        <div className="relative">
          <Image
            className=" h-[612px] w-full object-cover"
            alt="carousel image"
            width={1920}
            height={1200}
            src={imgSrc}
            // src={
            //   env.NEXT_PUBLIC_STRAPI_API_URL ||
            //   "http://127.0.0.1:1337" + `${heroImg}`
            // }
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
        <div className="absolute inset-0 z-20 flex flex-col  items-center justify-center text-white">
          <Image
            className="w-64 sm:w-96 md:w-[600px]"
            alt="logo image"
            src={LOGOIMG as string}
          />
        </div>
      </div>
    </>
  );
};

export default Carousel;
