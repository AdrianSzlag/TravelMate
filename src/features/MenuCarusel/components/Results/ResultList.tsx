import React from "react";
import useResults from "../../../../store/search-context";
import Result from "./Result";
import useFocus from "../../../../store/focus-context";
import { IPlace } from "../../../../types/types";

const ResultList = () => {
  const { results } = useResults();
  const { setFocused } = useFocus();

  const onClickHandle = (result: IPlace) => {
    setFocused(result);
  };

  return (
    <ul className="flex w-full flex-shrink flex-grow flex-col gap-1 divide-y-2 overflow-auto p-1">
      {results.map((result) => {
        return (
          <li key={result.id}>
            <Result
              name={result.name}
              description={result.description}
              thumbnail={result.thumbnail}
              onClick={() => onClickHandle(result)}
            />
          </li>
        );
      })}
    </ul>
  );
};
export default ResultList;
