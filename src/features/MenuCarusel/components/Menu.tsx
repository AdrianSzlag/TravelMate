import { useState } from "react";
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

  const toggleMapVisibility = () => {
    setIsMapVisible((prev) => !prev);
  };

  return (
    <Carusel className={` ${isMapVisible ? " h-[40%] xs:h-full " : " "} `}>
      <CaruselItem>
        <Filters onSubmit={() => setActive(true)} />
      </CaruselItem>
      {active && (
        <CaruselItem>
          <NaviButtons
            text="Search"
            onBack={() => setActive(false)}
            isMapVisible={isMapVisible}
            toggleMapVisibility={toggleMapVisibility}
          />
          <ResultList />
        </CaruselItem>
      )}
      {active && focused != null && (
        <CaruselItem>
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
