import { useEffect, useState } from "react";
import Filters from "./components/Filters";
import ResultList from "./components/Results/ResultList";
import Carusel from "./components/Carusel";
import CaruselItem from "./components/CaruselItem";
import NaviButtons from "./components/NaviButtons";
import Place from "./components/Place/Place";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { placesActions } from "../../store/places-slice";
import { IPlace } from "../../customTypes/IPlace";
import { useParams, useLocation } from "react-router-dom";
import { fetchPlace } from "../../store/places-actions";
import { useAppNavigate } from "../../hooks/use-navigate";

const Menu = () => {
  const dispatch = useAppDispatch();
  const focused = useAppSelector((state) => state.places.focused);
  const navigate = useAppNavigate();
  const { placeId } = useParams();
  const { pathname } = useLocation();

  const [active, setActive] = useState(
    pathname.startsWith("/search") || pathname.startsWith("/place")
  );

  const [isMapVisible, setIsMapVisible] = useState(false);

  useEffect(() => {
    const path = `/${
      !active ? "" : focused ? `place/${focused.id}` : "search"
    }`;
    navigate(path, {});
  }, [active, focused]);

  useEffect(() => {
    if (placeId) {
      dispatch(fetchPlace(placeId));
    }
  }, []);

  const setFocused = (place: IPlace | null) => {
    dispatch(placesActions.setFocused(place));
  };

  const onClosePreviewHandler = () => {
    setFocused(null);
  };

  const onCloseResultsHandler = () => {
    onClosePreviewHandler();
    setActive(false);
  };

  useEffect(() => {
    if (focused) {
      setIsMapVisible(false);
      setActive(true);
    }
  }, [focused]);

  const toggleMapVisibility = () => {
    setIsMapVisible((prev) => !prev);
  };

  const onSubmitFiltersHandler = () => {
    setActive(true);
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
        <Filters onSubmit={onSubmitFiltersHandler} />
      </CaruselItem>
      {active && (
        <CaruselItem className="h-full w-full xs:w-[400px]">
          <NaviButtons
            text="Search"
            onBack={onCloseResultsHandler}
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
            onBack={onClosePreviewHandler}
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
