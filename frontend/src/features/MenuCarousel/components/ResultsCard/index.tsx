import { IPlace } from "types/IPlace";
import { placesActions } from "store/places-slice";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import Rating from "../Rating";
import Img from "components/Img";

interface Props {
  onClick: () => void;
  name: string;
  description?: string;
  thumbnail: string;
  rating?: number;
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
        {!!rating && numberOfReviews > 0 && (
          <Rating rating={rating} numberOfReviews={numberOfReviews} />
        )}
        {numberOfReviews === 0 && (
          <div className="text-gray-400">No reviews yet!</div>
        )}
        {description && (
          <div className="mt-0.5 text-sm font-semibold text-gray-400">
            {description}
          </div>
        )}
      </div>
      <Img
        src={`/${thumbnail}`}
        alt=""
        className="h-24 w-24 rounded-xl object-cover"
      />
    </div>
  );
};

const ResultsList = () => {
  const results = useAppSelector((state) => state.places.places);
  const dispatch = useAppDispatch();

  const onClickHandle = (result: IPlace) => {
    dispatch(placesActions.setFocused(result));
  };

  return (
    <ul className="flex w-full flex-shrink flex-grow flex-col divide-y-2 overflow-auto">
      {results.map((result) => {
        return (
          <li key={result.id}>
            <Result
              name={result.name}
              description={result.description}
              thumbnail={result.thumbnail}
              rating={result.rating}
              onClick={() => onClickHandle(result)}
              numberOfReviews={result.reviews.length}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default ResultsList;
