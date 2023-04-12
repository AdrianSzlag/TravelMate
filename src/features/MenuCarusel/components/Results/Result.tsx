import React from "react";
import { IPlace } from "../../../../types/types";
import useFocus from "../../../../store/focus-context";

interface Props {
  onClick: () => void;
  name: string;
  description: string;
  thumbnail: string;
}

const Result = ({ onClick, name, description, thumbnail }: Props) => {
  return (
    <div
      className="flex justify-between rounded-lg p-1 text-gray-600 "
      onClick={onClick}
    >
      <div>
        <div className="text- font-bold text-gray-800">{name}</div>
        <div>{description}</div>
      </div>
      <img src={thumbnail} alt="" className="w-28 rounded-xl object-cover" />
      {/* <div>
        <div className="text-lg font-semibold">{result.name}</div>
        <div>{result.description}</div>
      </div> */}
    </div>
  );
};

export default Result;
