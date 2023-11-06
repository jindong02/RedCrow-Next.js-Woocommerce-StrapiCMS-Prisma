import { type StaticImageData } from "next/image";

export interface IInnerProduct {
  name: string;
  href: string;
}
export interface IInnerImg {
  src: string | StaticImageData;
  href: string;
}
export interface INavItem {
  name: string;
  href: string;
  innerProducts?: IInnerProduct[];
  innerImgs?: IInnerImg[];
}
