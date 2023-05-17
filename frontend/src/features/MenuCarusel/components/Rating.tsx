import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface Props {
  rating: number;
  numberOfReviews: number;
}

const Rating = ({ rating, numberOfReviews }: Props) => {
  const roundedToHalf = Math.round(rating * 2) / 2;
  const roundedToTenth = Math.round(rating * 10) / 10;

  const star = (i: number) => {
    if (roundedToHalf - i >= 1) {
      return <FaStar key={i} className="text-yellow-400" />;
    } else if (roundedToHalf - i === 0.5) {
      return <FaStarHalfAlt key={i} className="text-yellow-400" />;
    } else {
      return <FaRegStar key={i} className="text-yellow-400" />;
    }
  };

  return (
    <div className="flex items-center">
      <span className="font-semibold text-gray-400">{roundedToTenth}</span>
      <div className="ml-1 flex items-center">
        {[...Array(5)].map((_, i) => star(i))}
      </div>
      <span className="ml-1  font-semibold text-gray-400">
        ({numberOfReviews})
      </span>
    </div>
  );
};

export default Rating;
