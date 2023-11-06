import React from "react";

// const SubscribeSection = () => {
//   return (
//     <>
//       <div className="h-[1px] w-full bg-[#BFBFBF]"></div>

//       <div className="flex flex-col items-center justify-center space-y-4 py-28 font-light md:flex-row md:space-y-0 md:space-x-6">
//         <h4 className="text-2xl md:text-4xl">Enjoy 10% off your first order</h4>
//         <button className="bg-black px-16 py-3 text-white transition duration-200 hover:bg-main ">
//           Subscribe
//         </button>
//       </div>
//     </>
//   );
// };

const SubscribeSection = () => {
  return (
    <>
      <div className="order-1 flex w-full flex-col items-center justify-center space-y-6 font-light md:order-2 md:w-fit md:flex-row md:space-y-0 md:space-x-6">
        <h4 className="whitespace-nowrap text-center text-xl md:text-end">
          Enjoy 10% off your <br className="whit hidden md:block" /> first order
        </h4>
        <button className="w-full bg-black px-20 py-3 text-xl text-white transition duration-200 hover:bg-main">
          Subscribe
        </button>
      </div>
    </>
  );
};

export default SubscribeSection;
