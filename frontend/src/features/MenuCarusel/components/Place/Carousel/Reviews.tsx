import { useAppSelector } from "hooks/redux-hooks";
import Rating from "../../Rating";
import UserAvatar from "components/UserAvatar";
import MyReview from "./MyReview";
import { getUser } from "utils/auth";

interface ReviewProps {
  name: string;
  rating: number;
  comment?: string;
}

const Review = ({ name, rating, comment }: ReviewProps) => {
  return (
    <div className="border-b py-2">
      <div className="flex w-full">
        <UserAvatar userId={name} />
        <div className="pl-2 font-semibold text-gray-600">
          <div>{name}</div>
          <Rating rating={rating} />
        </div>
      </div>
      {comment && (
        <div className="w-full px-1 pt-2 text-gray-600 text-sm font-semibold">
          {comment}
        </div>
      )}
    </div>
  );
};

const Reviews = () => {
  const reviews = useAppSelector((state) => state.places.focused?.reviews);
  console.log("reviews", reviews);

  const userId = getUser()?.id;
  const otherReviews = reviews?.filter((review) => review.user.id !== userId);

  return (
    <div className="py-1">
      {userId && <MyReview />}
      {!userId && (
        <div className="text-sm text-gray-400 font-bold cursor-pointer">
          Log in to leave a review
        </div>
      )}
      {otherReviews?.map((review) => (
        <Review
          key={review.user.id}
          name={review.user.name}
          rating={review.rating}
          comment={review.comment}
        />
      ))}
      {!otherReviews && (
        <div className="w-full text-center text-gray-400">No reviews yet!</div>
      )}
    </div>
  );
};

export default Reviews;
