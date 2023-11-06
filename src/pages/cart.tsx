import Head from "next/head";
import img1 from "../../public/assets/to_be_removed/prod_01.png";
import img2 from "../../public/assets/to_be_removed/prod_02.png";
import img3 from "../../public/assets/to_be_removed/prod_03.png";
import YouMayAlsoLike from "~/components/Shop/YouMayAlsoLike";
import { type IProduct } from "~/types/product";
import Link from "next/link";
import CartProduct from "~/components/Cart/CartProduct";
import { type ICartItem } from "~/types/cart";
import { useCart } from "~/context/CartContext";
import { intToKZT } from "~/utils/helpers";
// import { LineItem, Order } from "~/types/WooCommerceTypes";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import React, { useReducer, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  shippingReducer,
  ActionTypes,
  initialState,
} from "../utils/shippingReducer";
import CountryList from "country-list";

const products: IProduct[] = [
  {
    name: "Clutch with floral pattern",
    images: [{ src: img1 }, { src: img3 }],
    price: "195 000",
  },
  {
    name: "Clutch with floral pattern",
    images: [{ src: img2 }, { src: img1 }],
    price: "195 000",
  },
  {
    name: "Clutch with floral pattern",
    images: [{ src: img3 }, { src: img1 }],
    price: "195 000",
  },
  {
    name: "Clutch with floral pattern",
    images: [{ src: img2 }],
    price: "195 000",
  },
  {
    name: "Clutch with floral pattern",
    images: [{ src: img3 }],
    price: "195 000",
  },
];

const cartItems: ICartItem[] = [
  {
    name: "Clutch with floral pattern",
    image: { src: img1 },
    price: "195 000",
    colour: "brown",
    size: "nosize",
  },
  {
    name: "Brown Clutch",
    image: { src: img3 },
    price: "195 000",
    colour: "black",
    size: "nosize",
  },
];

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(shippingReducer, initialState);
  const { cartItems: guestItems, totalAmount } = useCart();
  const orderMutation = api.product.createNewOrder.useMutation();
  const yookassa = api.payment.createPaymentInYookassa.useMutation();
  const router = useRouter();
  const countryData = CountryList.getData();
  countryData.sort((a, b) => a.name.localeCompare(b.name));

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const handleChange = (field: keyof typeof initialState, value: string) => {
    dispatch({ type: ActionTypes.UPDATE_FIELD, field, value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    /* Payment */
    const payment = await yookassa.mutateAsync({
      summ: Math.ceil((totalAmount * 0.2) / 10) * 10,
    });
    if (payment?.confirmation.confirmation_url && !payment.paid)
      await router.push(payment?.confirmation.confirmation_url);

    /* WebHook */

    /* Order */
    const myLineItms = guestItems.map((itm) => ({
      product_id: itm.product.id,
      variation_id: itm.variationNumber,
      quantity: itm.quantity,
      total: String(itm.quantity * itm.price),
      subtotal: String(itm.quantity * itm.price),
    }));
    const myOrder = {
      payment_method: "card",
      payment_method_title: "Card",
      line_items: myLineItms,
      shipping: {
        address_1: state.address1,
        address_2: state.address2,
        city: state.city,
        company: state.company,
        country: state.country,
        email: state.email,
        first_name: state.firstName,
        last_name: state.lastName,
        postcode: state.postalCode,
        state: "",
      },
      billing: {
        address_1: state.address1,
        address_2: state.address2,
        city: state.city,
        company: state.company,
        country: state.country,
        email: state.email,
        first_name: state.firstName,
        last_name: state.lastName,
        postcode: state.postalCode,
        phone: state.phone,
        state: "",
      },
    };
    orderMutation.mutate({ order: myOrder });
    if (orderMutation.isSuccess) console.log("Done", orderMutation.data);
    if (orderMutation.error)
      console.log("[Error]:", orderMutation.error.message);
  };

  return (
    <>
      <Head>
        <title>Redcrow - Cart</title>
      </Head>
      <main className="mt-7 min-h-screen">
        {/* Cart */}
        {cartItems && cartItems.length > 0 ? (
          <div className="justify-between md:flex">
            {/* cart items */}
            <div className="md:w-1/2 ">
              <h2 className="mb-4 text-sm font-medium uppercase tracking-[1.5px]">
                shopping bag items
              </h2>
              <div className="h-[1px] w-full bg-[#BFBFBF]"></div>
              {guestItems
                ? guestItems?.map((cartItem, i) => {
                    return (
                      <React.Fragment key={`cart-itemz-${i}`}>
                        <CartProduct
                          className=""
                          key={`prod-${i}`}
                          cartItem={cartItem}
                        />
                        <div
                          key={`div-${i}`}
                          className="h-[1px] w-full bg-[#BFBFBF]"
                        ></div>
                      </React.Fragment>
                    );
                  })
                : cartItems?.map(() => {
                    return null;
                    // <>
                    //   <CartProduct
                    //     className="py-7"
                    //     key={i}
                    //     cartItem={cartItem}
                    //   />
                    //   <div
                    //     key={i}
                    //     className="h-[1px] w-full bg-[#BFBFBF]"
                    //   ></div>
                    // </>
                  })}
            </div>
            {/* checkout details */}
            <div className="md:w-1/3">
              <h2 className="mt-4 mb-4 text-sm font-medium uppercase tracking-[1.5px] md:mt-0">
                order summary
              </h2>
              <div className="h-[1px] w-full bg-[#BFBFBF]"></div>
              {/* Details */}
              <div className="mt-7 flex items-center justify-between">
                <h3 className="text-base tracking-[1.5px]">Order Value</h3>
                <h5 className="text-lg font-bold">{intToKZT(totalAmount)}</h5>
              </div>
              <div className="mt-2 flex items-center justify-between text-base tracking-[1.5px]">
                <h3 className="">Delivery</h3>
                <h5 className="">Free</h5>
              </div>
              <h2 className="mt-2 text-base tracking-[1.5px]">
                Got a Promotion Code?
              </h2>
              <div className="mt-1 mb-10 flex items-center justify-between gap-x-5">
                <input
                  type="text"
                  name="promotion-code"
                  className="grow bg-[#D9D9D9] px-2 py-1 text-sm font-medium tracking-[1.5px] outline-none"
                  id="promotion-code"
                />
                <button className="border border-[#BFBFBF] px-6 py-1 text-sm font-medium tracking-[1.5px] transition duration-200 hover:bg-[#BFBFBF] hover:text-white">
                  ADD
                </button>
              </div>
              <div className="h-[1px] w-full bg-[#BFBFBF]"></div>
              <div className="mt-5 mb-7 flex items-center justify-between">
                <h3 className="text-sm font-medium tracking-[1.5px]">TOTAL</h3>
                <h5 className="text-lg font-bold">{intToKZT(totalAmount)}</h5>
              </div>
              <button
                className="w-full bg-black py-3.5 text-xl font-light text-white duration-200 hover:bg-main"
                onClick={openModal}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-my_lightGray flex items-center justify-between border-t-2 border-main px-8 py-5 ">
            <p>Cart is empty.</p>
            <Link
              href="/products"
              className="font-bold text-main hover:underline"
            >
              BROWSE PRODUCTS
            </Link>
          </div>
        )}
        {/* You may also like */}
        <div className="mt-14">
          <h5 className="mb-2 text-base font-semibold">Recently Viewed</h5>
          <YouMayAlsoLike products={products} />
        </div>
        {/* <SubscribeSection /> */}
        <Transition appear show={isOpen} as={React.Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 top-20 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Shipping Details
                      </Dialog.Title>
                      <form
                        onSubmit={handleCheckout}
                        className="grid grid-cols-2 gap-4"
                      >
                        <label className="block">
                          First Name*
                          <input
                            type="text"
                            required
                            value={state.firstName}
                            onChange={(e) =>
                              handleChange("firstName", e.target.value)
                            }
                            className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
                          />
                        </label>
                        <label className="block">
                          Last Name*
                          <input
                            type="text"
                            required
                            value={state.lastName}
                            onChange={(e) =>
                              handleChange("lastName", e.target.value)
                            }
                            className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
                          />
                        </label>
                        <label className="col-span-2 block">
                          Address line 1*
                          <input
                            type="text"
                            required
                            value={state.address1}
                            onChange={(e) =>
                              handleChange("address1", e.target.value)
                            }
                            className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
                          />
                        </label>
                        <label className="col-span-2 block">
                          Address line 2
                          <input
                            type="text"
                            value={state.address2}
                            onChange={(e) =>
                              handleChange("address2", e.target.value)
                            }
                            className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
                          />
                        </label>
                        <label className="block">
                          Country*
                          <select
                            required
                            value={state.country}
                            onChange={(e) =>
                              handleChange("country", e.target.value)
                            }
                            className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
                          >
                            <option value="">Select a country</option>
                            {countryData.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="block">
                          City*
                          <input
                            type="text"
                            required
                            value={state.city}
                            onChange={(e) =>
                              handleChange("city", e.target.value)
                            }
                            className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
                          />
                        </label>
                        <label className="block">
                          Company
                          <input
                            type="text"
                            value={state.company}
                            onChange={(e) =>
                              handleChange("company", e.target.value)
                            }
                            className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
                          />
                        </label>
                        <label className="block">
                          Postcode / ZIP*
                          <input
                            type="text"
                            required
                            value={state.postalCode}
                            onChange={(e) =>
                              handleChange("postalCode", e.target.value)
                            }
                            className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
                          />
                        </label>
                        <label className="col-span-2 block">
                          Email*
                          <input
                            type="email"
                            required
                            value={state.email}
                            onChange={(e) =>
                              handleChange("email", e.target.value)
                            }
                            className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
                          />
                        </label>
                        <label className="col-span-2 block">
                          Phone*
                          <input
                            type="text"
                            required
                            value={state.phone}
                            onChange={(e) =>
                              handleChange("phone", e.target.value)
                            }
                            className="w-full rounded-md border px-2 py-1 focus:border-black focus:outline-none"
                          />
                        </label>

                        {/* Add more form fields */}
                        <div className="col-span-2">
                          <button
                            type="submit"
                            className="w-full bg-black py-3.5 text-xl font-light text-white duration-200 hover:bg-main"
                          >
                            Pay
                          </button>
                        </div>
                      </form>

                      {/* <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Got it, thanks!
                        </button>
                      </div> */}
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      </main>
    </>
  );
};

export default Cart;
