import { IPlace } from "types/IPlace";
import Rating from "../Rating";
import { useSearchParams } from "react-router-dom";
import Services from "./Carousel/Services";
import Reviews from "./Carousel/Reviews";
import Information from "./Carousel/Information";

interface ButtonProps {
  text: string;
  onClick: () => void;
  active?: boolean;
}
const CarouselButton = ({ text, onClick, active }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`box-border px-4 py-3 font-semibold ${
        active
          ? "border-b-2 border-blue-500 text-blue-500 hover:bg-blue-100"
          : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      {text}
    </button>
  );
};

interface Props {
  place: IPlace;
}

const Place = ({ place }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getActivePage = () => {
    if (!searchParams.has("details")) {
      return "services";
    }
    switch (searchParams.get("details")) {
      case "reviews":
        return "reviews";
      case "information":
        return "information";
      default:
        return "services";
    }
  };
  const activePage = getActivePage();

  const getOnClickPage = (pageName: string) => () => {
    setSearchParams((params) => {
      const p = Object.fromEntries(params.entries());
      return { ...p, details: pageName };
    });
  };

  const isActive = (pageName: string) => {
    return pageName === activePage;
  };

  return (
    <div>
      <img
        src={`/${place.thumbnail}`}
        alt={place.name}
        className="h-[200px] w-full object-cover"
      />
      <div className="px-5 py-3 ">
        <h1 className="pb-2 text-2xl font-semibold text-gray-600">
          {place.name}
        </h1>
        {place.rating && (
          <Rating
            rating={place.rating}
            numberOfReviews={place.reviews.length}
          />
        )}
        {!place.rating && <div className="text-gray-400">No reviews yet!</div>}
        <p className="mb-2 font-semibold text-gray-500">{place.description}</p>
        <div className="flex w-full justify-between border-b">
          <CarouselButton
            text={"Services"}
            onClick={getOnClickPage("services")}
            active={isActive("services")}
          />
          <CarouselButton
            text={"Reviews"}
            onClick={getOnClickPage("reviews")}
            active={isActive("reviews")}
          />
          <CarouselButton
            text={"Information"}
            onClick={getOnClickPage("information")}
            active={isActive("information")}
          />
        </div>
        {activePage === "services" && <Services />}
        {activePage === "reviews" && <Reviews />}
        {activePage === "information" && <Information />}
      </div>
    </div>
  );
};

export default Place;
