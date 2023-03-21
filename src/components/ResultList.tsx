import useResults from "../hooks/useResults";
const ResultList = () => {
  const { results } = useResults();
  return (
    <div>
      {results.map((result) => {
        return <div>{result.name}</div>;
      })}
    </div>
  );
};
export default ResultList;
