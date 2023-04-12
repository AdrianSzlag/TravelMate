import { Children, useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Carusel = ({ children, className }: Props) => {
  const count = Children.toArray(children).length;

  console.log(count);

  return (
    <div
      className={`flex h-full max-h-full w-full flex-shrink-0 flex-grow-0 justify-end bg-transparent ${
        className ? className : " "
      }`}
    >
      {children}
    </div>
  );
};

export default Carusel;
