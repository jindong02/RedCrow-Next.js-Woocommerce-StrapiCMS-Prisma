import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Disclosure } from "@headlessui/react";
import { type INavItem } from "~/types/navbar";
import { motion } from "framer-motion";
import { api } from "~/utils/api";
import React from "react";

function CategoriesMenu({
  navItm,
  categoryName,
  isOpen,
  toggleOpen,
  toggleClose,
}: {
  navItm: INavItem;
  categoryName: string;
  isOpen: boolean;
  toggleOpen: () => void;
  toggleClose: () => void;
}) {
  const { name, href } = navItm;
  //   const [isOpen, setIsOpen] = useState(false);

  const { data: children } = api.product.getAllCategoryChildren.useQuery({
    name: categoryName,
  });
  if (!children || (children && children.length == 0))
    return (
      <Link
        href={href}
        onMouseEnter={toggleClose}
        className="text-base font-normal tracking-[1.5px] transition duration-300 hover:text-black"
      >
        {name}
      </Link>
    );

  const content = (
    <motion.div
      key={isOpen ? "open" : null}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.2 }}
      className="myContainerBig w-full py-8 text-lg"
    >
      <div className="grid grid-flow-col grid-rows-5 justify-start gap-x-40">
        {children.map((child, i) => (
          <React.Fragment key={`cat-men-item-${i}`}>
            <Link
              key={`t-${i}`}
              href={href + `&subcategory=${child.sub?.name}`}
              className="w-fit font-bold hover:underline"
            >
              • {child.sub?.name}
            </Link>
            {child.itsCollection?.map((coll, i) => (
              <Link
                key={i}
                href={
                  href +
                  `&subcategory=${child.sub?.name}&collection=${coll.name}`
                }
                className="w-fit pl-4 hover:underline"
              >
                ‣ {coll.name}
              </Link>
            ))}
          </React.Fragment>
        ))}
      </div>
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
                {children.map((child, i) => (
                  <React.Fragment key={`cart-itemyy-${i}`}>
                    <Link
                      key={`t2-${i}`}
                      href={href + `&subcategory=${child.sub?.name}`}
                      className="w-fit py-1 text-base font-bold hover:underline"
                    >
                      • {child.sub?.name}
                    </Link>
                    {child.itsCollection?.map((coll, i) => (
                      <Link
                        key={`g-${i}`}
                        href={
                          href +
                          `&subcategory=${child.sub?.name}&collection=${coll.name}`
                        }
                        className="w-fit py-1 pl-2 text-base hover:underline"
                      >
                        ‣ {coll.name}
                      </Link>
                    ))}
                  </React.Fragment>
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}

export default CategoriesMenu;
