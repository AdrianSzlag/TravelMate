import React from "react";
import useResults from "../store/search-context";
import Result from "./Result";
const ResultList = () => {
  const { results } = useResults();
  return (
    <ul className="flex w-full flex-col gap-4">
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
