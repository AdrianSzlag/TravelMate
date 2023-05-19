import { useState } from "react";
import Services from "./Services";
import Reviews from "./Reviews";

interface ButtonPorps {
  text: string;
  onClick: () => void;
  active?: boolean;
}
const CarouselButton = ({ text, onClick, active }: ButtonPorps) => {
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
  const [page, setPage] = useState<string>(pages[0]);

  const isActive = (pageName: string) => {
    return page === pageName;
  };

  const handlePageChange = (pageName: string) => {
    setPage(pageName);
  };

  return (
    <div>
      <div className="flex w-full justify-between border-b">
        {pages.map((pageName) => (
          <CarouselButton
            key={pageName}
            text={pageName}
            onClick={() => handlePageChange(pageName)}
            active={isActive(pageName)}
          />
        ))}
      </div>
      {page === "Services" && <Services />}
      {page === "Reviews" && <Reviews />}
    </div>
  );
};

export default Carousel;
