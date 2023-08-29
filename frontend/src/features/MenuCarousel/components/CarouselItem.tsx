interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const CarouselItem = ({ children, className, onClick }: Props) => {
  const onClickHandler = () => {
    if (onClick) onClick();
  };
  return (
    <div
      className={`relative flex-shrink-0 flex-grow-0 snap-x bg-transparent ${
        className ? className : " "
      }`}
    >
      <div
        className="absolute top-0 bottom-0 left-0 right-0 overflow-auto border-l bg-transparent"
        onClick={onClickHandler}
      >
        {children}
      </div>
    </div>
  );
};

export default CarouselItem;
