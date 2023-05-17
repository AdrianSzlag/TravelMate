import { IPlace } from "../../../../types/types";
import Rating from "../Rating";

interface Props {
  place: IPlace;
}

const Place = ({ place }: Props) => {
  return (
    <div>
      <img
        src={place.thumbnail}
        alt={place.name}
        className="h-[200px] w-full object-cover"
      />
      <div className="px-5 py-3 ">
        <h1 className="pb-2 text-2xl font-semibold text-gray-600">
          {place.name}
        </h1>
        <Rating rating={place.rating} numberOfReviews={100} />
        <p className="font-semibold text-gray-500">{place.description}</p>
      </div>
    </div>
  );
};

export default Place;
