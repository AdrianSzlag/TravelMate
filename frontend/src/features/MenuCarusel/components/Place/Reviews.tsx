import { useAppSelector } from "hooks/redux-hooks";
import Rating from "../Rating";
import UserAvatar from "components/UserAvatar";
import MyReview from "./MyReview";

interface ReviewProps {
  image?: string;
  name: string;
  rating: number;
  comment?: string;
}

const Review = ({ image, name, rating, comment }: ReviewProps) => {
  return (
    <div className="border-b py-2">
      <div className="flex w-full">
        <UserAvatar name={name} image={image} />
        <div className="pl-2 font-semibold text-gray-600">
          <div>{name}</div>
          <Rating rating={rating} />
        </div>
      </div>
      {comment && (
        <div className="w-full px-1 pt-2 text-sm font-semibold text-gray-600">
          {comment}
        </div>
      )}
    </div>
  );
};

const Reviews = () => {
  const reviews = useAppSelector((state) => state.places.focused?.reviews);
  const user = useAppSelector((state) => state.auth.user);
  console.log("reviews", reviews);

  const userId = user?.id;
  const otherReviews = reviews?.filter((review) => review.user.id !== userId);

  return (
    <div className="">
      {userId && <MyReview />}
      {!userId && (
        <div className="cursor-pointer text-sm font-bold text-gray-400">
          Log in to leave a review
        </div>
      )}
      {otherReviews?.map((review) => (
        <Review
          image={review.user.profileImage}
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
