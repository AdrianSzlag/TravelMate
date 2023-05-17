import React from "react";
import useResults from "../../../../store/search-context";
import Result from "./Result";
import useFocus from "../../../../store/focus-context";
import { IPlace } from "../../../../types/IPlace";

const ResultList = () => {
  const { results } = useResults();
  const { setFocused } = useFocus();

  const onClickHandle = (result: IPlace) => {
    setFocused(result);
  };

  return (
    <ul className="flex w-full flex-shrink flex-grow flex-col divide-y-2 overflow-auto">
      {results.map((result) => {
        return (
          <li key={result._id}>
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
