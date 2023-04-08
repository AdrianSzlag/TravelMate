interface Props {
  children: React.ReactNode;
}

const CaruselItem = ({ children }: Props) => {
  return (
    <div className=" h-full w-full flex-shrink-0 flex-grow-0 snap-x bg-gray-100 xs:w-[256px]">
      {children}
    </div>
  );
};

export default CaruselItem;
