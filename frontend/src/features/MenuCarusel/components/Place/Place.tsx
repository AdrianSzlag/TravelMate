import { IPlace } from "types/IPlace";
import Rating from "../Rating";
import { useSearchParams } from "react-router-dom";
import Services from "./Services";
import Reviews from "./Reviews";
import Overview from "./Overview";
import { useMemo } from "react";
import Menu from "./Menu";

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

  const isMenuAvailable = place.menu?.length > 0;
  const areServicesAvailable = place.services?.length > 0;

  const activePage = useMemo(() => {
    const page = searchParams.get("details");
    if (!page) return "overview";
    if (page === "menu" && isMenuAvailable) return "menu";
    if (page === "services" && areServicesAvailable) return "services";
    if (page === "reviews") return "reviews";
    return "overview";
  }, [searchParams, place]);

  const getOnClickPageHandler = (pageName: string) => () => {
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
        <div className="flex w-full justify-evenly border-b">
          <CarouselButton
            text={"Overview"}
            onClick={getOnClickPageHandler("overview")}
            active={isActive("overview")}
          />
          {isMenuAvailable && (
            <CarouselButton
              text={"Menu"}
              onClick={getOnClickPageHandler("menu")}
              active={isActive("menu")}
            />
          )}
          {areServicesAvailable && (
            <CarouselButton
              text={"Services"}
              onClick={getOnClickPageHandler("services")}
              active={isActive("services")}
            />
          )}
          <CarouselButton
            text={"Reviews"}
            onClick={getOnClickPageHandler("reviews")}
            active={isActive("reviews")}
          />
        </div>
        {activePage === "menu" && <Menu />}
        {activePage === "services" && <Services />}
        {activePage === "reviews" && <Reviews />}
        {activePage === "overview" && <Overview />}
      </div>
    </div>
  );
};

export default Place;
