import { useState } from "react";
import { useAppSelector } from "../../../../../hooks/redux-hooks";
import Rating from "../../Rating";
import UserAvatar from "../../../../../components/UserAvatar";
import NewReview from "./NewReview";

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
  const [addReview, setAddReview] = useState(false);

  const myReview = () => {
    return (
      <>
        {addReview && <NewReview />}
        {!addReview && (
          <div
            className="cursor-pointer font-semibold text-blue-500"
            onClick={() => setAddReview(true)}
          >
            Add Review
          </div>
        )}
      </>
    );
  };

  if (!reviews || reviews.length === 0)
    return (
      <div className="w-full pt-4">
        {myReview()}
        <div className="w-full text-center text-gray-400">No reviews yet!</div>
      </div>
    );

  return (
    <div className="py-1">
      {myReview()}
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
