import Services from "./Services";
import Reviews from "./Reviews";
import Information from "./Information";
import { useSearchParams } from "react-router-dom";

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

const pages = ["Services", "Reviews", "Information"] as const;

const Carousel = () => {
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
    <>
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
    </>
  );
};

export default Carousel;
