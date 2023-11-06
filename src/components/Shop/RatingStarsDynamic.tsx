import React, { useState } from "react";
import { StarIcon as OutlinedStar } from "@heroicons/react/24/outline";
import { StarIcon as SolidStar } from "@heroicons/react/24/solid";

const RatingStartsDynamic = ({
  setRating,
  className = "",
}: {
  setRating: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
}) => {
  let currentRating = 1;
  const outlined = (id: number) => (
    <OutlinedStar
      key={id}
      className={className}
      onClick={() => ratingChanged(id)}
      onMouseEnter={() => ratingChanged_hover(id)}
      onMouseLeave={() => ratingChanged_hover(currentRating)}
    />
  );

  const filled = (id: number) => (
    <SolidStar
      key={id}
      className={className}
      onClick={() => ratingChanged(id)}
      onMouseEnter={() => ratingChanged_hover(id)}
      onMouseLeave={() => ratingChanged_hover(currentRating)}
    />
  );

  const starsList: JSX.Element[] = [];
  starsList.push(filled(1));
  for (let i = 2; i <= 5; i++) {
    starsList.push(outlined(i));
    // if (i <= value) starsList.push(filled(i));
    // else starsList.push(outlined(i));
  }
  const initialStars = starsList.map((s) => s);

  //   const [rating, setRating] = useState(1);
  const [starts, setStars] = useState(initialStars);

  const ratingChanged = (val: number) => {
    setRating(val);
    currentRating = val;
    const newStars: JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= val) newStars.push(filled(i));
      else newStars.push(outlined(i));
    }
    setStars(newStars);
  };

  const ratingChanged_hover = (val: number) => {
    setRating(val);
    const newStars: JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= val) newStars.push(filled(i));
      else newStars.push(outlined(i));
    }
    setStars(newStars);
  };

  return <div className="flex items-center">{starts}</div>;
};

export default RatingStartsDynamic;
