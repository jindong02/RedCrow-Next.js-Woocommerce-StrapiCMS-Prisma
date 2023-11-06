export interface IStrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface IHeroImgAttribute {
  src: {
    data: {
      id: number;
      attributes: {
        name: string;
        url: string;
      };
    };
  };
}
export interface INavItmAttribute {
  name: string;
  href: string;
  innerProducts: {
    id: number;
    name: string;
    href: string;
  }[];
  innerImgs: {
    id: number;
    href: string;
    image: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
        };
      };
    };
  }[];
}

export interface IStrapiHeroImage {
  id: number;
  attributes: IHeroImgAttribute;
}

export interface IStrapiNavBar {
  id: number;
  attributes: INavItmAttribute;
}
