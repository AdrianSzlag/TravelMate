import UserAvatar from "components/UserAvatar";
import { useAppSelector } from "hooks/redux-hooks";
import { useState } from "react";

interface ButtonProps {
  onClick?: () => void;
  text: string;
}

export const DropdownButton = ({ onClick, text }: ButtonProps) => {
  const onClickHandler = () => onClick && onClick();
  return (
    <li onClick={onClickHandler} className="text-sm text-gray-700">
      <a href="#" className="block px-4 py-2 hover:bg-gray-100">
        {text}
      </a>
    </li>
  );
};

interface Props {
  children: React.ReactNode;
}

const Dropdown = ({ children }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  return (
    <div className="relative">
      <button
        className={`${
          isOpen ? "ring-4 ring-gray-100" : ""
        } flex items-center text-sm font-medium text-white rounded-full md:mr-0`}
        onClick={toggle}
      >
        <UserAvatar
          name={user?.name || ""}
          url={user?.profileImage}
          className="bg-pink-600 w-8 h-8 mr-2 !text-base"
        />
        <div className="hidden xs:flex items-center">
          {user?.name}
          <svg
            className="w-4 h-4 mx-1.5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </button>
      <div
        className={`${
          isOpen ? "" : "hidden"
        } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-60 absolute right-0 mt-2`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
