import Head from "next/head";
import React, { useEffect, useState } from "react";
import Breadcrumb from "~/components/Shop/Breadcrumb";
import Dropbox, { type IDropBoxItem } from "~/components/Shop/Dropbox";
import FilterSidebar, {
  type IFilterSlugIDComb,
} from "~/components/Shop/FilterSidebar";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import Pagination from "~/components/Shop/Pagination";
import "react-loading-skeleton/dist/skeleton.css";

const sortOptions: IDropBoxItem[] = [
  { id: 1, name: "Sort by", unavailable: false },
  { id: 2, name: "Sort by popularity", unavailable: true },
  { id: 3, name: "Sort by average rating", unavailable: true },
  { id: 4, name: "Sort by newness", unavailable: true },
  { id: 5, name: "Sort by price: low to high", unavailable: false },
  { id: 6, name: "Sort by price: high to low", unavailable: false },
];
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { type ParsedUrlQuery } from "querystring";
import {
  getWooCommerceAttributeTerms,
  getWooCommerceAttributes,
} from "~/utils/wooCommerceApi";
import { type NextPage, type GetServerSideProps } from "next";
import { type IFilteringArray } from "~/types/WooCommerceTypes";

const selectCurrentCategory = (q: ParsedUrlQuery) => {
  if (q.collection) return q.collection as string;
  if (q.subcategory) return q.subcategory as string;
  if (q.category) return q.category as string;
  return undefined;
};
interface IProps {
  filterArrOriginal: IFilteringArray[];
}
const Shop: NextPage<IProps> = ({ filterArrOriginal }) => {
  const [, setSelectedSortValue] = useState(sortOptions[0]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterArr, setFilterArr] =
    useState<IFilteringArray[]>(filterArrOriginal);
  const [filterArry, setFilterArry] = useState<IFilterSlugIDComb[]>([]);
  const [filterArry2, setFilterArry2] = useState<IFilterSlugIDComb[]>([]);
  // Price
  const [filterMin, setFilterMin] = useState(1000);
  const [filterMin2, setFilterMin2] = useState(1000);
  const [filterMax, setFilterMax] = useState(100000);
  const [filterMax2, setFilterMax2] = useState(100000);

  const router = useRouter();

  const currentCategory = selectCurrentCategory(router.query);
  const searchQuery = (router.query.searchQuery as string) || "";

  const { data: categoryId } = api.product.getCategoryId.useQuery({
    name: currentCategory || "",
  });
  const {
    data: products,
    refetch,
    isLoading,
  } = api.product.getAll.useQuery(
    {
      categoryId: categoryId == -1 ? undefined : categoryId,
      filterArr: filterArry2,
      minPrice: filterMin2,
      maxPrice: filterMax2,
      searchQuery: searchQuery,
    },
    {}
  );

  // console.log("product => ", products);

  function handleSelectSort(value: IDropBoxItem) {
    setSelectedSortValue(value);
  }

  function doRefetch() {
    // Set states before refetch
    setFilterArry2(filterArry);
    setFilterMin2(filterMin);
    setFilterMax2(filterMax);
    refetch();
  }
  useEffect(() => {
    console.log(products)
    if (filterArry.length == 0 || products?.length == 0)
      setFilterArr(filterArrOriginal);
    else {
      let ids = products
        ?.map((prod) => prod.attributes.map((attr) => attr.id))
        .flat();
      if (ids) {
        ids = [...new Set(ids)];
        const newArr = filterArr.filter((flt) => ids?.includes(flt.id));
        setFilterArr(newArr);
      } else {
        setFilterArr(filterArrOriginal);
      }
    }
  }, [products]);
  // let ids = products
  // ?.map(prod).filter(prodname => prodname.name?.includes(searchQuery))
  // .flat();
  return (
    <>
      <Head>
        <title>Redcrow - Магазин</title>
      </Head>
      <div className="mb-4">
        <Breadcrumb />
      </div>
      <div className="min-h-screen w-full">
        <h1 className="text-5xl font-medium">
          {currentCategory ? currentCategory : "Магазин"}
        </h1>

        <FilterSidebar
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          attrArr={filterArr}
          filterArr={filterArry}
          setFilterArr={setFilterArry}
          refetchFunc={doRefetch}
          filterMax={filterMax}
          filterMin={filterMin}
          setFilterMax={setFilterMax}
          setFilterMin={setFilterMin}
        />
        {/* Content */}
        <div className="flex-1 px-4 pt-3 md:ml-72">
          {/* Store grid */}
          <div className="mt-8">
            {/* Top Bar */}
            <div className="mb-1 flex items-center justify-between">
              <div className="">
                <Dropbox list={sortOptions} onSelect={handleSelectSort} />
              </div>
              <button
                onClick={() => setIsFilterOpen(true)}
                className="mr-1 inline-flex items-center justify-center border-2 border-main px-2 py-1 text-[13px] font-bold md:hidden"
              >
                <AdjustmentsHorizontalIcon className="mr-1 h-5 w-5" />
                Filter
              </button>
            </div>
            {/* List of products */}
            {searchQuery != "" && (
              <h5>Search results for: {searchQuery.toUpperCase()}</h5>
            )}
            <Pagination
              products={products}
              productsPerPage={9}
              isLoading={isLoading}
              filterArry2={filterArry2}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const attrs = await getWooCommerceAttributes();
  const filteredAttr = attrs?.filter((itm) => !itm.slug.includes("yookassa"));
  const uniqueNames: string[] = [];
  const filteredX = filteredAttr?.filter((item) => {
    if (!uniqueNames.includes(item.name)) {
      uniqueNames.push(item.name);
      return true;
    }
    return false;
  });
  const output: IFilteringArray[] = [];
  if (filteredX) {
    for (let i = 0; i < filteredX.length; i++) {
      const attr = filteredX[i];
      if (attr) {
        const terms = await getWooCommerceAttributeTerms(attr.id);
        output.push({
          id: attr.id,
          name: attr.name,
          terms: terms || [],
          slug: attr.slug,
        });
      }
    }
  }
  return {
    props: {
      filterArrOriginal: output,
    },
  };
};

export default Shop;
