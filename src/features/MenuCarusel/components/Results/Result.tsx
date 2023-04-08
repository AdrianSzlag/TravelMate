import React from "react";
import { PlaceData } from "../../../../types/types";
import useFocus from "../../../../store/focus-context";

interface Props {
  result: PlaceData;
}

const Result = ({ result }: Props) => {
  const { setFocused } = useFocus();
  const onClickHandle = () => {
    console.log(result);
    setFocused(result);
  };
  return (
    <div className="flex rounded-lg border p-1">
      <img
        src={result.thumbnail}
        alt=""
        className="h-[150px] w-full object-cover"
        onClick={onClickHandle}
      />
      {/* <div>
        <div className="text-lg font-semibold">{result.name}</div>
        <div>{result.description}</div>
      </div> */}
    </div>
  );
};

export default Result;
