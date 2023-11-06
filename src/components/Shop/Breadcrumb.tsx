import Link from "next/link";
import { useRouter } from "next/router";

const Breadcrumb = ({ push = "" }: { push?: string }) => {
  const router = useRouter();
  const category = router.query.category as string | undefined;
  const subcategory = router.query.subcategory as string | undefined;
  const collection = router.query.collection as string | undefined;
  return (
    <nav className="mt-3 flex py-3" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 text-sm">
        <li className="inline-flex items-center font-medium">
          <Link href="/shop" className="hover:underline">
            Магазин
          </Link>
        </li>
        {category && (
          <li>
            <div className="flex items-center font-medium">
              <p className="mr-1">/</p>
              <Link
                href={`/shop?category=${category}`}
                className="hover:underline"
              >
                {category}
              </Link>
            </div>
          </li>
        )}
        {subcategory && (
          <li>
            <div className="flex items-center font-medium">
              <p className="mr-1">/</p>
              <Link
                href={`/shop?category=${category}&subcategory=${subcategory}`}
                className="hover:underline"
              >
                {subcategory}
              </Link>
            </div>
          </li>
        )}
        {collection && (
          <li>
            <div className="flex items-center font-medium">
              <p className="mr-1">/</p>
              <Link
                href={`/shop?category=${category}&subcategory=${subcategory}&collection=${collection}`}
                className="hover:underline"
              >
                {collection}
              </Link>
            </div>
          </li>
        )}
        {push != "" && (
          <li>
            <div className="flex items-center font-medium">
              <p className="mr-1">/</p>
              <span>{push}</span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
