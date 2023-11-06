export enum ECarouselStyle {
  Style1,
  Style2,
}

export interface ICarouselSlide {
  image: string;
  style: ECarouselStyle;
  title?: string;
  category?: string;
  percentage: number;
  price: number;
}
