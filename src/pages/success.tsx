import Head from "next/head";
import Link from "next/link";
import { useCart } from "~/context/CartContext";

const SuccessPage = () => {
  const { clearCart } = useCart();
  clearCart();
  return (
    <>
      <Head>
        <title>Redcrow - Payment Success</title>
      </Head>
      <main>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="mb-8 text-4xl font-bold">Thank you for purchasing!</h1>
          <Link href="/">
            <button className="text-blue-500 hover:underline">
              Return to Home
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default SuccessPage;
