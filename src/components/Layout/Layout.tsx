import React from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";
// const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="myContainerSmall md:myContainerBig">
      <Navbar />
      <>{children}</>
      <Footer />
    </div>
  );
};

export default Layout;
