import { StarIcon as OutlinedStar } from "@heroicons/react/24/outline";
import { StarIcon as SolidStar } from "@heroicons/react/24/solid";
const RatingStartsStatic = ({
  value = 5,
  className = "",
}: {
  value?: number;
  className?: string;
}) => {
  const starsList: JSX.Element[] = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= value) starsList.push(<SolidStar key={i} className={className} />);
    else starsList.push(<OutlinedStar key={i} className={className} />);
  }

  return <div className="flex items-center">{starsList.map((s) => s)}</div>;
};

export default RatingStartsStatic;
