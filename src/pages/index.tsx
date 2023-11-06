import { type AxiosResponse } from "axios";
import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import Carousel from "~/components/Home/Carousel";
import PopularProducts from "~/components/Home/PopularProducts";
import { type INavItem } from "~/types/navbar";
import type { IStrapiHeroImage, IStrapiResponse } from "~/types/strapi";
import { fetchHeroImage } from "~/utils/strapiApi";

interface IProps {
  heroImg: string;
  navIms: INavItem[];
}

const Home: NextPage<IProps> = ({ heroImg }) => {
  return (
    <>
      <Head>
        <title>Redcrow - Home</title>
        <meta name="description" content="created by Youssef Elshabrawy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Carousel heroImg={heroImg} />
      <main>
        <PopularProducts />
        {/* <ShopByCategory categories={CATEGORY_DATA} /> */}
        {/* <FeaturedBanners banners={FEATURED_BANNERS} /> */}
      </main>

      {/* <main className="flex min-h-screen flex-col items-center justify-center "></main> */}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // const {
  //   data: heroImgData,
  // }: AxiosResponse<IStrapiResponse<IStrapiHeroImage>> = await fetchHeroImage();

  return {
    props: {
      // heroImg: heroImgData.data.attributes.src.data.attributes.url,
      heroImg: "",
    },
  };
};

export default Home;
