import useResults from "../hooks/useResults";
import Result from "./Result";
const ResultList = () => {
  const { results } = useResults();
  return (
    <ul className="flex w-full flex-col gap-4">
      {results.map((result) => {
        return (
          <li>
            <Result result={result} />
          </li>
        );
      })}
    </ul>
  );
};
export default ResultList;
