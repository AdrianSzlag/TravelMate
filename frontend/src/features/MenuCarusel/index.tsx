import { useEffect, useState } from "react";
import Filters from "./components/Filters";
import ResultList from "./components/Results/ResultList";
import Carusel from "./components/Carusel";
import CaruselItem from "./components/CaruselItem";
import NaviButtons from "./components/NaviButtons";
import Place from "./components/Place/Place";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { placesActions } from "../../store/places-slice";
import { IPlace } from "../../types/IPlace";

const Menu = () => {
  const dispatch = useAppDispatch();
  const places = useAppSelector((state) => state.places.places);
  const focused = useAppSelector((state) => state.places.focused);

  const [active, setActive] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);

  const setFocused = (place: IPlace | null) =>
    dispatch(placesActions.setFocused(place));

  const onCloseMenuHandler = () => {
    setActive(false);
    setFocused(null);
  };

  useEffect(() => {
    if (places.length > 0) {
      setActive(true);
    }
  }, []);

  useEffect(() => {
    if (focused) {
      setIsMapVisible(false);
      setActive(true);
    }
  }, [focused]);

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
            onBack={onCloseMenuHandler}
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
          <Place place={focused} />
        </CaruselItem>
      )}
    </Carusel>
  );
};

export { Menu };
