import { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import UserAvatar from "../../../../../components/UserAvatar";

interface StarsProps {
  rating: number;
  setRating: (rating: number) => void;
}

const Stars = ({ rating, setRating }: StarsProps) => {
  const [preview, setPreview] = useState(5);

  const roundedToHalf = Math.round(preview * 2) / 2;
  const roundedToTenth = Math.round(preview * 10) / 10;
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

  const onHover = (i: number) => {
    setPreview(i);
  };

  const onClick = () => {
    setRating(preview);
  };

  const onMouseLeaveHandler = () => {
    if (rating !== null) setPreview(rating);
  };

  return (
    <div className="flex items-center">
      <div className="relative flex w-5 items-center">
        <span className="absolute font-semibold text-gray-400">
          {ratingString}
        </span>
      </div>
      <div
        className="flex cursor-pointer"
        onClick={onClick}
        onMouseLeave={onMouseLeaveHandler}
      >
        <div className="pl-2" onMouseOver={() => onHover(0)}></div>
        <div className="relative h-fit w-fit">
          <div className="z-10 flex items-center">
            {[...Array(5)].map((_, i) => star(i))}
          </div>
          <div className="z-4 absolute top-0 bottom-0 left-0 right-0 flex justify-evenly">
            {[...Array(5)].map((_, i) => (
              <div
                className="h-full flex-1"
                onMouseOver={() => onHover(i + 1)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const NewReview = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 126) setComment(e.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="border-b" onSubmit={onSubmit}>
      <div className="flex w-full py-2 ">
        <UserAvatar userId={"adr"} />
        <div className="pl-4">
          <div>{"name"}</div>
          <Stars rating={rating ?? 5} setRating={setRating} />
        </div>
      </div>
      <label htmlFor="comment" className="block pb-1 text-gray-600">
        Add a review:
      </label>
      <textarea
        className="h-20 w-full resize-none rounded border px-2 py-1 text-gray-700"
        id="comment"
        value={comment}
        onChange={onCommentChange}
      />
      <div className="flex justify-end pb-2 pr-2">
        <button
          className="rounded bg-blue-500 px-3 py-1 font-semibold text-white"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewReview;
