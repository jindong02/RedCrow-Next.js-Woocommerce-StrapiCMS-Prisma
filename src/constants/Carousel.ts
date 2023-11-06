import { ECarouselStyle, type ICarouselSlide } from "~/types/carousel";

export const CAROUSEL_DATA: ICarouselSlide[] = [
  {
    image:
      "https://d-themes.com/react/porto/demo3/images/home/slider/slide1.jpg",
    style: ECarouselStyle.Style1,
    title: "Winter Fashion Trends",
    percentage: 30,
    category: "Jackets",
    price: 199.99,
  },
  {
    image:
      "https://d-themes.com/react/porto/demo3/images/home/slider/slide2.jpg",
    style: ECarouselStyle.Style2,
    title: "New Season Hats",
    percentage: 20,
    price: 19.99,
  },
];
