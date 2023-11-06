import React, { useState } from "react";
import RatingStartsDynamic from "./RatingStarsDynamic";

const ReviewTab = () => {
  const [, setRating] = useState(1);
  return (
    <div>
      <h1 className="text-[20px] font-normal">Review</h1>
      <p className=" text-[14px] font-normal text-mygray">
        There are no reviews yet.
      </p>
      <div className="my-10 h-[1px] w-full bg-gray-200"></div>
      {/* Add Rating Form */}
      <div className="mb-10 bg-[#F4F4F4] px-6 py-8 ">
        <h1 className="text-[20px] font-normal">Add a review</h1>

        <form>
          <p className="text-Bm text-my_darkGray mb-2">Your Rating*</p>
          <RatingStartsDynamic
            className="h-5 w-5 cursor-pointer text-mygray"
            setRating={setRating}
          />
          <p className="text-Bm text-my_darkGray mt-2">Your Review*</p>
          <textarea
            required
            className="border-my_lightGray w-full border-b-[1.5px] px-2 py-1"
            name="rev-body"
            id="rev-body"
            // value={review}
            // onChange={(e) => setReview(e.target.value)}
          />
          {/* Name */}
          <p className="text-Bm text-my_darkGray mt-2">Name*</p>
          <input
            required
            type="text"
            name="rev-name"
            id="rev-name"
            //   value={name}
            //   onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="border-my_lightGray placeholder:text-Bm placeholder:text-my_darkGray w-full border-b-[1.5px] px-2 py-3"
          />
          {/* Email */}
          <p className="text-Bm text-my_darkGray mt-2">Email*</p>
          <input
            required
            type="email"
            name="rev-email"
            id="rev-email"
            //   value={name}
            //   onChange={(e) => setName(e.target.value)}
            placeholder="Enter your email"
            className="border-my_lightGray placeholder:text-Bm placeholder:text-my_darkGray w-full border-b-[1.5px] px-2 py-3"
          />

          <button
            type="submit"
            className="mt-4 rounded-md border-2 border-black bg-black py-3 px-8 font-medium text-white hover:bg-white hover:text-black"
          >
            Sumbit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewTab;
