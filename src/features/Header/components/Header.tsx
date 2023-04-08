import React from "react";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <nav className="flex-shrink-0 flex-grow-0 bg-blue-700 px-2.5 py-2.5 text-white sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center whitespace-nowrap text-xl font-semibold">
          <img src="logo.svg" alt="" />
          <div>BooKing.com</div>
        </div>
        <button
          type="button"
          className="ml-3 flex items-center md:hidden"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <AiOutlineMenu className="h-8 w-8" />
        </button>
        <div
          className={`${
            navbarOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="flex flex-col rounded-lg bg-blue-700 md:flex-row md:space-x-8 ">
            <li className="mt-2 md:mt-0">
              <div className="px-2 py-1 text-lg text-white">Home</div>
            </li>
            <li className="mt-2 md:mt-0">
              <div className="px-2 py-1 text-lg text-white">Info</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
