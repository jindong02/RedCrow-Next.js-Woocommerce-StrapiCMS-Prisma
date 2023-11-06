import Image from "next/image";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Disclosure } from "@headlessui/react";
import { type INavItem } from "~/types/navbar";
import { motion } from "framer-motion";

function DropdownMenu({
  navItm,
  isOpen,
  toggleOpen,
  toggleClose,
}: {
  navItm: INavItem;
  isOpen: boolean;
  toggleOpen: () => void;
  toggleClose: () => void;
}) {
  const { name, href, innerProducts, innerImgs } = navItm;
  // const [isOpen, setIsOpen] = useState(false);
  const content = (
    <motion.div
      key={isOpen ? "open" : null}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.2 }}
      className="myContainerBig w-full py-8 text-lg"
    >
      <div className="grid grid-flow-col grid-rows-5 justify-start gap-x-40">
        <h5 className="font-bold">New Items</h5>
        <h5 className="font-bold">In Stock</h5>
        {innerProducts?.map((prod, i) => (
          <Link
            key={i}
            href={prod.href}
            className="w-fit transition duration-300 hover:text-black"
          >
            {prod.name}
          </Link>
        ))}
      </div>
      {innerImgs && (
        <div className="mt-4 flex items-center justify-between">
          {innerImgs.map((img, i) => (
            <Link key={i} href={img.href} className="relative w-80">
              <div className="overflow-hidden">
                <Image
                  alt="product image"
                  className="transition duration-300 hover:scale-110"
                  src={img.src}
                  width={1000}
                  height={1000}
                />
              </div>
              <span className="absolute inset-0 top-2 -left-2 z-40 h-fit w-fit bg-[#8C3131] px-3 text-sm text-white">
                New
              </span>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
  // return null;
  return (
    <>
      {/* // Desktop */}
      <div className="hidden text-left md:inline-block">
        <Link
          href={href}
          className="text-base font-normal tracking-[1.5px] transition duration-300 hover:text-black"
          onMouseEnter={toggleOpen}
          // onMouseLeave={() => setIsOpen(false)}
        >
          {name}
        </Link>

        <motion.div
          initial={{ y: "-100%" }}
          animate={{
            y: isOpen ? 0 : "-100%",
          }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5 }}
          onMouseEnter={toggleOpen}
          onMouseLeave={toggleClose}
          className={`${
            isOpen
              ? "pointer-events-auto top-full"
              : "pointer-events-none top-full"
          } absolute inset-0 -z-20  h-fit bg-white`}
        >
          {content}
        </motion.div>
      </div>

      {isOpen && (
        <div
          onClick={toggleClose}
          className="fixed inset-0 top-20 -z-30 h-screen w-screen bg-white opacity-40"
        ></div>
      )}
      {/* // Mobile */}
      <div
        className="relative inline-block text-left md:hidden"
        // onClick={() => void router.push(hrefMain)}
      >
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex w-full items-center justify-between text-base font-normal tracking-[1.5px]">
                <Link href={href}>{name}</Link>
                <Disclosure.Button>
                  <ChevronDownIcon
                    className={`${open ? "rotate-180 transform" : ""}  h-5 w-5`}
                  />
                </Disclosure.Button>
              </div>
              <Disclosure.Panel className="flex flex-col pl-2 text-[12px] font-normal">
                {/* <Link key={i} href={it.href}>
                  <h5 className="py-3 pl-2">{it.name}</h5>
                </Link> */}
                {innerProducts?.map((prod, i) => (
                  <Link key={i} href={prod.href} className="py-3 pl-2">
                    {prod.name}
                  </Link>
                ))}
                {/* {dropdownItems.variations.map((variation, i) => (
                  <div key={i}>
                    <h5 className="py-3 font-bold underline">
                      {variation.title?.toUpperCase()}
                    </h5>
                    {variation.items.map((it, i) => (
                      <Link key={i} href={it.href}>
                        <h5 className="py-3 pl-2">{it.name}</h5>
                      </Link>
                    ))}
                  </div>
                ))} */}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}

export default DropdownMenu;
