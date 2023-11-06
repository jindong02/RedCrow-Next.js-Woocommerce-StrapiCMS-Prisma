import axios from "axios";
import { env } from "~/env.mjs";

const axiosApi = axios.create({
  baseURL: env.NEXT_PUBLIC_STRAPI_API_URL,
  headers: {
    Authorization: `Bearer ${env.STRAPI_API_KEY}`,
  },
});

export const fetchHeroImage = async () =>
  axiosApi.get("/api/hero-img?populate=*");

export const fetchNavItems = async () =>
  axiosApi.get("/api/navbar-items?populate=deep");
