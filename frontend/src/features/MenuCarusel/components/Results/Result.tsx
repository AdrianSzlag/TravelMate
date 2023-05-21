import Rating from "../Rating";

interface Props {
  onClick: () => void;
  name: string;
  description?: string;
  thumbnail: string;
  rating: number;
  numberOfReviews: number;
}

const Result = ({
  onClick,
  name,
  description,
  thumbnail,
  rating,
  numberOfReviews,
}: Props) => {
  return (
    <div
      className="flex cursor-pointer justify-between rounded-lg px-4 py-3  text-gray-600 hover:bg-gray-50"
      onClick={onClick}
    >
      <div>
        <div className="text-lg font-semibold text-gray-800">{name}</div>
        <Rating rating={rating} numberOfReviews={numberOfReviews} />
        {description && <div>{description}</div>}
      </div>

      <img
        src={`/${thumbnail}`}
        alt=""
        className="h-24 w-24 rounded-xl object-cover"
      />
    </div>
  );
};

export default Result;
