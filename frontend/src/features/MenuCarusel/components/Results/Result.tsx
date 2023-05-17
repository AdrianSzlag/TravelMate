import React from "react";
import { IPlace } from "../../../../types/types";
import useFocus from "../../../../store/focus-context";
import Rating from "../Rating";

interface Props {
  onClick: () => void;
  name: string;
  description: string;
  thumbnail: string;
  rating: number;
}

const Result = ({ onClick, name, description, thumbnail, rating }: Props) => {
  return (
    <div
      className="flex justify-between rounded-lg p-4 text-gray-600 "
      onClick={onClick}
    >
      <div>
        <div className="text-lg font-semibold text-gray-800">{name}</div>
        <Rating rating={rating} numberOfReviews={100} />
        <div>{description}</div>
      </div>

      <img
        src={thumbnail}
        alt=""
        className="h-24 w-24 rounded-xl object-cover"
      />
    </div>
  );
};

export default Result;
