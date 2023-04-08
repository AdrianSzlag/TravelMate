interface Props {
  children: React.ReactNode;
}

const CaruselItem = ({ children }: Props) => {
  return (
    <div className="relative h-full w-full flex-shrink-0 flex-grow-0 snap-x bg-gray-100 xs:w-[256px]">
      <div className="absolute top-0 bottom-0 left-0 right-0 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default CaruselItem;
