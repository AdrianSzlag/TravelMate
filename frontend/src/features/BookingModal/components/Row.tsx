import { useRef } from "react";
import Arrow from "./Arrow";

interface OptionProps {
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const Option = ({
  isSelected,
  isDisabled,
  onClick,
  children,
  className,
}: OptionProps) => {
  const textColor = isSelected ? "text-white" : "text-gray-500";
  const bgColor = isSelected ? "bg-blue-500" : "bg-white";
  const onClickHandler = () => {
    if (isDisabled) return;
    onClick();
  };
  return (
    <div
      className={`${className} ${bgColor} relative rounded-xl border text flex justify-center items-center w-16 h-20 cursor-pointer flex-shrink-0 flex-grow-0`}
      onClick={onClickHandler}
    >
      <div
        className={`${textColor} flex flex-col justify-center items-center font-semibold z-0`}
      >
        {children}
      </div>
      {isDisabled && (
        <div className="absolute w-full h-full bg-[#0000000a] rounded-xl !cursor-not-allowed z-10"></div>
      )}
    </div>
  );
};

interface RowProps {
  children: React.ReactNode;
}

export const Row = ({ children }: RowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const clickHandler = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const { scrollLeft, clientWidth } = rowRef.current;
    const scrollTo =
      direction === "left"
        ? scrollLeft - clientWidth / 2
        : scrollLeft + clientWidth / 2;
    rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  return (
    <div className="flex items-center mt-4">
      <Arrow
        direction="left"
        onClick={() => clickHandler("left")}
        className="flex-grow-0 flex-shrink-0"
      />
      <div className="flex gap-4 flex-1 overflow-hidden" ref={rowRef}>
        {children}
      </div>
      <Arrow
        direction="right"
        onClick={() => clickHandler("right")}
        className="flex-grow-0 flex-shrink-0"
      />
    </div>
  );
};
