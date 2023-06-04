import React, { Children } from "react";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  notifications: number;
}

const NavBar = ({ children, notifications }: Props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <nav className="flex-shrink-0 flex-grow-0 bg-blue-700 px-2.5 py-2.5 text-white sm:px-4">
      <div className="mx-auto flex flex-wrap items-center justify-between">
        <Link to="/">
          <div className="flex cursor-pointer items-center whitespace-nowrap text-xl font-semibold">
            {/* <img src="logo.svg" alt="" /> */}
            <div>BooKing.com</div>
          </div>
        </Link>
        <button
          type="button"
          className="ml-3 flex items-center md:hidden relative"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          {notifications > 0 && (
            <span className="flex top-0 -right-1 justify-center items-center absolute rounded-full w-4 h-4 bg-green-600 text-white font-semibold text-sm">
              {notifications}
            </span>
          )}
          <AiOutlineMenu className="h-8 w-8" />
        </button>
        <div
          className={`${
            navbarOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="flex flex-col rounded-lg bg-blue-700 md:flex-row md:space-x-8 ">
            {children}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
