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
    <div className="border-b">
      <div className="flex w-full py-2 ">
        <UserAvatar userId={name} />
        <div className="pl-4">
          <div>{name}</div>
          <Rating rating={rating} />
        </div>
      </div>
      {comment && (
        <div className="w-full px-2 pb-2 text-gray-600">{comment}</div>
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
      {!userId && <div> Log in to leave a review</div>}
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
