import Result from "./Result";
import { IPlace } from "../../../../types/IPlace";
import { placesActions } from "../../../../store/places-slice";
import { IReview } from "../../../../types/IReview";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";

const ResultList = () => {
  const results = useAppSelector((state) => state.places.places);
  const dispatch = useAppDispatch();

  const onClickHandle = (result: IPlace) => {
    //setFocused(result);
    dispatch(placesActions.setFocused(result));
  };

  const countRating = (reviews: IReview[]) => {
    let sum = 0;
    reviews.forEach((review) => {
      sum += review.rating;
    });
    return sum / reviews.length;
  };

  useEffect(() => {
    console.log("results", results);
  }, [results]);

  return (
    <ul className="flex w-full flex-shrink flex-grow flex-col divide-y-2 overflow-auto">
      {results.map((result) => {
        return (
          <li key={result.id}>
            <Result
              name={result.name}
              description={result.description}
              thumbnail={result.thumbnail}
              rating={countRating(result.reviews)}
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
