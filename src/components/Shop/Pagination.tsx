import { useState } from "react";
import ProductCard2 from "./ProductCard2";
import { type Product } from "~/types/WooCommerceTypes";
import { type IFilterSlugIDComb } from "./FilterSidebar";

const Pagination = ({
  products,
  productsPerPage = 10,
  isLoading,
  filterArry2,
}: {
  products: Product[] | undefined;
  productsPerPage: number;
  isLoading: boolean;
  filterArry2: IFilterSlugIDComb[];
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  if (isLoading)
    return (
      <div className="mb-14 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[undefined, undefined, undefined, undefined, undefined, undefined].map(
          (prod, i) => (
            <ProductCard2 key={i} product={prod} filterArry2={filterArry2} />
          )
        )}
      </div>
    );
  if (!products || products.length == 0)
    return (
      <h1 className="flex items-center justify-center text-2xl">No Products</h1>
    );

  const totalPages = Math.ceil(products.length / productsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="mb-4 flex flex-col">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {currentProducts.map((prod, i) => (
          <ProductCard2 key={i} product={prod} filterArry2={filterArry2}/>
        ))}
      </div>
      <ul className="mt-8 flex justify-center space-x-2 self-end">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`text-base ${
                currentPage === number ? "font-bold" : "hover:font-bold"
              }`}
              onClick={() => handlePageClick(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
