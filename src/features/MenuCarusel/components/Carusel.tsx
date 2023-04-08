import { Children, useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const Carusel = ({ children }: Props) => {
  const count = Children.toArray(children).length;

  console.log(count);

  return (
    <div
      className={`flex h-full w-full flex-shrink-0 flex-grow-0 justify-end overflow-hidden xs:w-[256px] ${
        count === 2 ? " md:w-[512px] " : " "
      } ${count === 3 ? " md:w-[512px] lg:w-[768px] " : " "}`}
    >
      {children}
    </div>
  );
};

export default Carusel;
