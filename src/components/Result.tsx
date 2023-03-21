import { Result as ResultType } from "../types/types";

interface Props {
  result: ResultType;
}

const Result = ({ result }: Props) => {
  return (
    <div className="flex gap-2 rounded-lg border p-2">
      <img src={result.thumbnail} alt="" className="h-[150px] w-[150px]" />
      <div>
        <div className="text-lg font-semibold">{result.name}</div>
        <div>{result.description}</div>
      </div>
    </div>
  );
};

export default Result;
