import { IoMdArrowRoundBack } from "react-icons/io";
import { TbMap2, TbMapOff } from "react-icons/tb";

interface Props {
  text: string;
  onBack: () => void;
  isMapVisible: boolean;
  toggleMapVisibility: () => void;
}

const NaviButtons = ({
  onBack,
  text,
  isMapVisible,
  toggleMapVisibility,
}: Props) => {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onBack}
        className="flex items-center gap-2 p-2 font-bold text-gray-500 hover:text-gray-800"
      >
        <IoMdArrowRoundBack className="h-7 w-7 " />
        {text}
      </button>
      <button onClick={toggleMapVisibility} className="p-2 xs:hidden">
        {isMapVisible ? (
          <TbMapOff className="h-7 w-7" />
        ) : (
          <TbMap2 className="h-7 w-7" />
        )}
      </button>
    </div>
  );
};

export default NaviButtons;
