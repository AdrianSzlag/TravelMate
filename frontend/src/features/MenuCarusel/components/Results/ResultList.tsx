import Result from "./Result";
import { IPlace } from "types/IPlace";
import { placesActions } from "store/places-slice";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";

const ResultList = () => {
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
export default ResultList;
