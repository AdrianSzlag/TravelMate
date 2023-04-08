import React from "react";
import useResults from "../../../../store/search-context";
import Result from "./Result";
const ResultList = () => {
  const { results } = useResults();
  return (
    <ul className="flex w-full flex-shrink flex-grow flex-col gap-1 overflow-auto p-1">
      {results.map((result) => {
        return (
          <li key={result.id}>
            <Result result={result} />
          </li>
        );
      })}
    </ul>
  );
};
export default ResultList;
