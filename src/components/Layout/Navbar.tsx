import Link from "next/link";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  // HeartIcon,
  ShoppingBagIcon,
  Bars3Icon as HamburgerIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
// import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";

// Static images
import IMG_LOGO from "../../../public/assets/logo.svg";
import im1 from "../../../public/assets/to_be_removed/drop_01.png";
import im2 from "../../../public/assets/to_be_removed/drop_02.png";
import im3 from "../../../public/assets/to_be_removed/drop_03.png";

// import { type IDropdownItems, INavItem } from "~/types";
import DropdownMenu from "./Navbar/DropdownMenu";
import { Fragment, useEffect, useState } from "react";
import Cart from "../Cart/Cart";
// import { type INavItem } from "~/types/navbar";
import { useRouter } from "next/router";
import { useCart } from "../../context/CartContext";
// import { fetchNavItems } from "~/utils/stripeApi";
// import { api } from "~/utils/api";
import { motion } from "framer-motion";
import { type INavItem } from "~/types/navbar";
import {
  STRING_NAME_CATIGORIES_ACCESSORIES,
  STRING_NAME_CATIGORIES_CLOTHES,
} from "~/constants/names";
import CategoriesMenu from "./Navbar/CategoriesMenu";

// Navbar Items
// const navItemContent = ["New Arrivals", "Clothing", "Accessories"];
const navItemContent: INavItem[] = [
  {
    name: "New Arrivals",
    href: "/shop",
    innerProducts: [
      { name: "Croissant Bag", href: "/" },
      { name: "Quilted Bags", href: "/" },
      { name: "Satchel Bag", href: "/" },
      { name: "Clutch Baguette", href: "/" },
      { name: "Tote", href: "/" },
      { name: "Backpacks", href: "/" },
      { name: "Belt Bag-Transformer", href: "/" },
      { name: "Hobo Bag", href: "/" },
      { name: "Clutches", href: "/" },
      { name: "Cosmetic Bag", href: "/" },
      { name: "Lily's Big Bag", href: "/" },
      { name: "Lily Mini Bag", href: "/" },
      { name: "Gift Certificates", href: "/" },
    ],
    innerImgs: [
      { src: im1, href: "/" },
      { src: im2, href: "/" },
      { src: im3, href: "/" },
    ],
  },
  {
    name: STRING_NAME_CATIGORIES_CLOTHES,
    href: `/shop?category=${STRING_NAME_CATIGORIES_CLOTHES}`,
  },
  {
    name: STRING_NAME_CATIGORIES_ACCESSORIES,
    href: `/shop?category=${STRING_NAME_CATIGORIES_ACCESSORIES}`,
  },
  {
    name: "Stores",
    href: "/",
  },
];

const iconClassName =
  "h-5 w-5 md:ml-4 cursor-pointer transition duration-300 hover:text-black";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const closeAllDropdowns = () => {
    setOpenDropdownIndex(null);
  };
  const toggleOpenState = (index: number) => {
    if (openDropdownIndex === index) {
      closeAllDropdowns();
      setOpenDropdownIndex(index);
    } else {
      setOpenDropdownIndex(index);
    }
  };

  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const { getCartQuantity } = useCart();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 90) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // const { data: navItemContent } = api.product.getNav.useQuery();

  const navItems = navItemContent.map((itm, i) => {
    return !(!itm.innerProducts || itm.innerProducts.length == 0) ? (
      <DropdownMenu
        key={i}
        navItm={itm}
        isOpen={openDropdownIndex === i}
        toggleOpen={() => toggleOpenState(i)}
        toggleClose={() => closeAllDropdowns()}
      />
    ) : itm.name == STRING_NAME_CATIGORIES_CLOTHES ||
      itm.name == STRING_NAME_CATIGORIES_ACCESSORIES ? (
      <CategoriesMenu
        key={i}
        navItm={itm}
        categoryName={itm.name}
        isOpen={openDropdownIndex === i}
        toggleOpen={() => toggleOpenState(i)}
        toggleClose={() => closeAllDropdowns()}
      />
    ) : (
      <Link
        key={i}
        className="items-center text-base font-normal tracking-[1.5px] transition duration-300 hover:text-black"
        href={itm.href}
      >
        {itm.name}
      </Link>
    );
  });
  return (
    <nav
      className={`relative z-50 bg-white ${
        scrolled ? "animate-upToDown sticky top-0" : ""
      } ${isHomePage ? "" : "border-b border-[#BFBFBF]"}`}
    >
      {/* Content */}
      <div
        className={`z-30 flex w-full items-center justify-between bg-white py-6`}
      >
        {/* Left */}
        <HamburgerIcon
          className="h-6 w-6 md:hidden"
          onClick={() => setIsHamburgerOpen((prev) => !prev)}
        />
        <div
          className={`${
            isHamburgerOpen ? "" : "-translate-x-full"
          } animate fixed top-0 bottom-0 left-0 z-[99] flex h-screen w-72 justify-start duration-500 ease-out md:hidden `}
        >
          <div
            className={`z-[99] h-full w-full transform overflow-y-auto bg-white px-4 py-10 pb-16`}
          >
            <XMarkIcon
              className="m-2 ml-auto h-6 w-6 md:hidden"
              onClick={() => setIsHamburgerOpen(false)}
            />
            <div className="flex flex-col space-y-6">{navItems}</div>
          </div>
        </div>
        {isHamburgerOpen && (
          <div
            onClick={() => setIsHamburgerOpen(false)}
            className="fixed inset-0 z-[60] h-screen w-screen bg-black opacity-30 md:hidden"
          ></div>
        )}
        <Link href="/" className="md:mr-12">
          <Image
            className="w-40 cursor-pointer md:w-72"
            src={IMG_LOGO as string}
            alt="logo"
          />
        </Link>
        <div
          className={`hidden justify-evenly md:top-0 md:mt-0 md:flex md:h-fit md:w-full md:items-center md:overflow-y-visible md:bg-inherit md:text-main`}
        >
          {navItems}
        </div>

        {/* Right */}
        <div className="flex items-center">
          <div className="hidden md:block"></div>
          <MagnifyingGlassIcon
            onClick={openModal}
            className={iconClassName + " hidden md:block"}
          />
          <Link className="relative" href="/cart">
            <ShoppingBagIcon
              className={iconClassName}
              onMouseEnter={() => setIsCartOpen(true)}
              // onClick={() => setIsCartOpen((prev) => !prev)}
            />
            <p className="absolute top-1 right-full text-[10px] font-medium tracking-[1.5px] transition duration-300 hover:text-black md:left-full">
              ({getCartQuantity()})
            </p>
          </Link>
          <div className="hidden text-left md:block">
            <motion.div
              initial={{ y: "-100%" }}
              animate={{
                y: isCartOpen ? 0 : "-100%",
              }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
              className={`${
                isCartOpen
                  ? "pointer-events-auto top-full"
                  : "pointer-events-none top-full"
              } absolute top-0 right-[112px] -z-20 h-fit max-h-[652px] w-fit min-w-[500px] overflow-y-scroll bg-white`}
            >
              <Cart isOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
            </motion.div>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-fit max-w-md transform overflow-hidden  bg-white p-4 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-center space-x-2">
                    <input
                      type="text"
                      className="rounded border border-gray-300 px-2 py-1 text-3xl focus:outline-none"
                      placeholder="Search..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <MagnifyingGlassIcon
                      onClick={() => {
                        closeModal();
                        setQuery("");
                        router.push(`/shop?searchQuery=${query}`);
                      }}
                      className={iconClassName + " hidden h-6 w-6 md:block"}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
};

export default Navbar;
