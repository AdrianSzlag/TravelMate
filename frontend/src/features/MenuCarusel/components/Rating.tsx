import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface Props {
  rating?: number;
  numberOfReviews?: number;
  onClick?: () => void;
}

const Rating = ({ rating, numberOfReviews, onClick }: Props) => {
  if (!rating) {
    return (
      <div className="flex items-center">
        <span className="font-semibold text-gray-400">No rating</span>
      </div>
    );
  }

  const onClickHandler = () => {
    if (onClick) {
      onClick();
    }
  };

  const roundedToHalf = Math.round(rating * 2) / 2;
  const roundedToTenth = Math.round(rating * 10) / 10;
  const ratingString =
    roundedToTenth.toString().length === 1
      ? roundedToTenth + ".0"
      : roundedToTenth.toString();

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
    <div className="flex items-center" onClick={onClickHandler}>
      <div className="relative flex w-5 items-center">
        <span className="absolute font-semibold text-gray-400">
          {ratingString}
        </span>
      </div>
      <div className="ml-1 flex items-center">
        {[...Array(5)].map((_, i) => star(i))}
      </div>
      {numberOfReviews && (
        <span className="ml-1 font-semibold text-gray-400">
          ({numberOfReviews})
        </span>
      )}
    </div>
  );
};

export default Rating;
