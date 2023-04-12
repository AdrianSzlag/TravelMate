import { useEffect, useState } from "react";
import Filters from "./Filters";
import ResultList from "./Results/ResultList";
import useFocus from "../../../store/focus-context";
import useSearch from "../../../store/search-context";
import BackButton from "./NaviButtons";
import Carusel from "./Carusel";
import CaruselItem from "./CaruselItem";
import NaviButtons from "./NaviButtons";

const Menu = () => {
  const { results } = useSearch();
  const { focused, setFocused } = useFocus();
  const [active, setActive] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);

  useEffect(() => {
    if (results.length > 0) {
      setActive(true);
    }
  }, []);

  const toggleMapVisibility = () => {
    setIsMapVisible((prev) => !prev);
  };

  return (
    <Carusel
      className={`bg-white ${
        isMapVisible && active ? " !h-[40%] xs:!h-full " : " "
      } ${active ? " xs:w-[400px] lg:w-[656px]  " : " xs:w-[256px] "} ${
        active && focused ? " lg:!w-[800px] xl:!w-[1056px] " : " "
      }`}
    >
      <CaruselItem className="h-full w-full sm:w-[256px]">
        <Filters onSubmit={() => setActive(true)} />
      </CaruselItem>
      {active && (
        <CaruselItem className="h-full w-full xs:w-[400px]">
          <NaviButtons
            text="Search"
            onBack={() => setActive(false)}
            isMapVisible={isMapVisible}
            toggleMapVisibility={toggleMapVisibility}
          />
          <ResultList />
        </CaruselItem>
      )}
      {active && focused && (
        <CaruselItem className="h-full w-full xs:w-[400px]">
          <NaviButtons
            text="Results"
            onBack={() => setFocused(null)}
            isMapVisible={isMapVisible}
            toggleMapVisibility={toggleMapVisibility}
          />
          <div>hello</div>
        </CaruselItem>
      )}
    </Carusel>
  );
};

export default Menu;
