import WooCommerceRestApi, {
  type WooCommerceRestApiOptions,
} from "@woocommerce/woocommerce-rest-api";
import { type AxiosResponse } from "axios";
import { env } from "~/env.mjs";
import type {
  Variation,
  Product,
  Category,
  Order,
  TAttribute,
  TAttributeTerm,
} from "~/types/WooCommerceTypes";

// initialise the WooCommerceRestApi //
const options: WooCommerceRestApiOptions = {
  url: env.WOOCOMMERCE_URL,
  consumerKey: env.WOOCOMMERCE_KEY,
  consumerSecret: env.WOOCOMMERCE_SECRET,
  version: "wc/v3",
};

const api = new WooCommerceRestApi(options);

// fetch all products from WooCommerce //
export async function fetchWooCommerceProducts(
  categoryId?: number,
  attrSlug?: string,
  termId?: number,
  minPrice?: number,
  maxPrice?: number,
  searchQuery?: string
) {
  try {
    let response;
    console.log(searchQuery)
    if (categoryId) {
      response = (await api.get(
        encodeURI(`products?search=${searchQuery}&category=${categoryId}&attribute=${
          attrSlug || ""
        }&attribute_term=${termId || ""}&min_price=${
          minPrice || ""
        }&max_price=${maxPrice || ""}`)
      )) as AxiosResponse<Product[]>;
    } else {
      response = (await api.get(
        encodeURI(`products?search=${searchQuery}&attribute=${
          attrSlug || ""
        }&attribute_term=${termId || ""}&min_price=${
          minPrice || ""
        }&max_price=${maxPrice || ""}`)
      )) as AxiosResponse<Product[]>;
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// Fetch one product
export async function fetchWooCommerceOneProduct(id: number) {
  try {
    const response = (await api.get(
      `products/${id}`
    )) as AxiosResponse<Product>;
    return response;
  } catch (error) {
    console.log(error);
  }
}

// Get one product Variants
export async function getWooCommerceOneProductVariations(id: number) {
  try {
    const response = (await api.get(
      `products/${id}/variations`
    )) as AxiosResponse<Variation[]>;
    return response;
  } catch (error) {
    console.log(error);
  }
}

/********************************
 *          Category
 ********************************/
// Get all categories
export async function wooCommerceGetAllCategories(parent?: number) {
  // If parent = 0 then we want the main categories (accessoris, cloth, ...)
  try {
    const response = (await api.get(
      `products/categories?parent=${parent || 0}`
    )) as AxiosResponse<Category[]>;
    return response;
  } catch (error) {
    console.log(error);
  }
}

// return category parent
export async function wooCommerceCategoryParentOf(id: number) {
  try {
    const response = (await api.get(
      `products/categories/${id}`
    )) as AxiosResponse<Category>;
    return response.data.parent;
  } catch (error) {
    console.log(error);
  }
}
// get id of clothing or accessories
export async function wooCommerceGetCategoryId(
  categoryName: string
): Promise<number | undefined> {
  try {
    const response = (await api.get(`products/categories`)) as AxiosResponse<
      Category[]
    >;
    for (let i = 0; i < response.data.length; i++)
      if (response.data[i]?.name == categoryName) return response.data[i]?.id;
    return -1;
  } catch (error) {
    console.log(error);
  }
}

// Create a new order
export async function createWooCommerceOrder(data: Order) {
  try {
    const response = (await api.post("orders", data)) as AxiosResponse;
    return response;
  } catch (error) {
    console.log(error);
  }
}

/* Filtering */
export async function getWooCommerceAttributes() {
  try {
    const response = (await api.get(`products/attributes`)) as AxiosResponse<
      TAttribute[]
    >;
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function getWooCommerceAttributeTerms(id: number) {
  try {
    const response = (await api.get(
      `products/attributes/${id}/terms`
    )) as AxiosResponse<TAttributeTerm[]>;
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
