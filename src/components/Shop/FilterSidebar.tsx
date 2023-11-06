import { XMarkIcon } from "@heroicons/react/24/outline";

import React, { useEffect, useState } from "react";
// import { CATEGORIES_DATA, COLORS } from "~/constants/FilterSidebar";
import PriceSlider from "./PriceSlider/PriceSlider";
import { type IFilteringArray } from "~/types/WooCommerceTypes";
export interface IFilterSlugIDComb {
  slug: string;
  termId: number;
  termName: string;
}
import { TrashIcon } from "@heroicons/react/24/outline";

const FilterSidebar = ({
  isFilterOpen,
  setIsFilterOpen,
  attrArr,
  filterArr,
  setFilterArr,
  refetchFunc,
  filterMin,
  setFilterMin,
  filterMax,
  setFilterMax,
}: {
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  attrArr: IFilteringArray[];
  filterArr: IFilterSlugIDComb[];
  setFilterArr: React.Dispatch<React.SetStateAction<IFilterSlugIDComb[]>>;
  filterMin: number;
  setFilterMin: React.Dispatch<React.SetStateAction<number>>;
  filterMax: number;
  setFilterMax: React.Dispatch<React.SetStateAction<number>>;
  refetchFunc: () => void;
}) => {
  const [scrolled, setScrolled] = useState(false);

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

  const content = (
    <>
      {attrArr.map((attr, i) => (
        <React.Fragment key={i}>
          <h2 className="border-b-[1.5px] pb-1 text-2xl font-semibold uppercase">
            {attr.name}
          </h2>
          <div>
            {attr.terms.map((term, j) => (
              <button
                key={`term.id-${term.id}-${j}`}
                className="flex w-full cursor-pointer items-center justify-between text-sm tracking-[1.5px]"
                value={term.name}
                onClick={() => {
                  if (
                    filterArr.find((el) => {
                      if (el.slug == attr.slug && el.termId == term.id)
                        return true;
                      return false;
                    })
                  ) {
                    // Remove
                    setFilterArr(
                      filterArr.filter(
                        (item) =>
                          !(item.slug === attr.slug && item.termId === term.id)
                      )
                    );
                  } else {
                    // Add
                    setFilterArr([
                      ...filterArr,
                      { slug: attr.slug, termId: term.id, termName: term.name },
                    ]);
                  }
                }}
              >
                <p className="w-fit uppercase">{term.name}</p>

                <div className="relative">
                  <div className={`m-2 ml-0 h-4 w-4 border border-main`}></div>
                  {filterArr.find((el) => {
                    if (el.slug == attr.slug && el.termId == term.id)
                      return true;
                    return false;
                  }) && (
                    <XMarkIcon className="absolute inset-0 top-2 right-2 text-main" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </React.Fragment>
      ))}
      {/* Price */}
      <h2 className="border-b-[1.5px] pb-1 text-2xl font-semibold uppercase">
        Price
      </h2>
      <div>
        <PriceSlider
          min={1000}
          max={100000}
          onChange={({ mini, maxi }: { mini: number; maxi: number }) => {
            setFilterMin(mini);
            setFilterMax(maxi);
          }}
        />
        <p className="mt-8 text-sm font-bold tracking-[1.5px]">
          Price: 〒{filterMin} — 〒{filterMax}
        </p>
      </div>
    </>
  );
  return (
    <>
      {/* Mobile */}
      <div
        className={`${
          isFilterOpen ? "" : "-translate-x-full"
        } animate fixed top-0 bottom-0 left-0 z-[99] flex h-screen w-72 justify-start duration-500 ease-out md:hidden`}
      >
        
        <div
          className={`z-[99] h-full w-full transform space-y-6 overflow-y-auto bg-white px-4 py-10 pb-16`}
        >
          <div className="flex items-center justify-between">
          <button
            onClick={refetchFunc}
            className="mr-1 inline-flex items-center justify-center border-2 border-main px-2 py-1 text-[13px] font-bold hover:bg-main hover:text-white"
          >
            Filter
          </button>
          <TrashIcon
            className="h-5 w-5 cursor-pointer"
            onClick={() => setFilterArr([])}
          />
        </div>
          {content}
        </div>
      </div>
      {isFilterOpen && (
        <div
          onClick={() => setIsFilterOpen(false)}
          className="fixed inset-0 z-[60] h-screen w-screen bg-black opacity-30 md:hidden"
        ></div>
      )}
      {/* Desktop */}
      <div
        className={`${
          scrolled ? "" : ""
        } scrollbar absolute mt-16 hidden h-[75vh] w-72 space-y-4 overflow-y-auto bg-white px-2 pb-10 md:block`}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={refetchFunc}
            className="mr-1 inline-flex items-center justify-center border-2 border-main px-2 py-1 text-[13px] font-bold hover:bg-main hover:text-white"
          >
            Filter
          </button>
          <TrashIcon
            className="h-5 w-5 cursor-pointer"
            onClick={() => setFilterArr([])}
          />
        </div>
        {content}
      </div>
    </>
  );
};

export default FilterSidebar;
