import { type AppType } from "next/app";
// import { type Session } from "next-auth";
// import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Layout from "~/components/Layout/Layout";
import { CartProvider } from "../context/CartContext";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
};

export default api.withTRPC(MyApp);
