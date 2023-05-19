import { useAppSelector } from "../../../../../hooks/redux-hooks";
import Rating from "../../Rating";

interface ReviewProps {
  name: string;

  rating: number;
  comment?: string;
}
const Review = ({ name, rating, comment }: ReviewProps) => {
  return (
    <div className="border-b">
      <div className="flex w-full py-2 ">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-400 text-center text-lg font-bold text-white">
          {name.charAt(0)}
        </div>
        <div className="pl-4">
          <div>{name}</div>
          <Rating rating={rating} />
        </div>
      </div>
      {comment && <div className="w-full px-2 text-gray-600">{comment}</div>}
    </div>
  );
};

const Reviews = () => {
  const reviews = useAppSelector((state) => state.places.focused?.reviews);

  if (!reviews || reviews.length === 0)
    return (
      <div className="w-full pt-4 text-center text-gray-400 ">
        No reviews yet.
      </div>
    );

  return (
    <div className="py-4">
      {reviews?.map((review) => (
        <Review
          key={review.userId}
          name={review.userId}
          rating={review.rating}
          comment={review.comment}
        />
      ))}
    </div>
  );
};

export default Reviews;
