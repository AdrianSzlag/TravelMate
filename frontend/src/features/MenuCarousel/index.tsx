import { useEffect, useState } from "react";
import Filters from "./components/FiltersCard";
import ResultsList from "./components/ResultsCard";
import Carousel from "./components/Carousel";
import CarouselItem from "./components/CarouselItem";
import NaviButtons from "./components/NaviButtons";
import Place from "./components/PlaceCard";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { placesActions } from "store/places-slice";
import { IPlace } from "types/IPlace";
import { useParams, useLocation } from "react-router-dom";
import { fetchPlace, fetchPlaces } from "store/places-actions";
import { useAppNavigate } from "hooks/use-navigate";

const Menu = () => {
  const dispatch = useAppDispatch();
  const focused = useAppSelector((state) => state.places.focused);
  const navigate = useAppNavigate();
  const { placeId } = useParams();
  const { pathname } = useLocation();
  const [firstLoad, setFirstLoad] = useState(true);

  const [active, setActive] = useState(
    pathname.startsWith("/search") || pathname.startsWith("/place")
  );

  const [isMapVisible, setIsMapVisible] = useState(false);

  useEffect(() => {
    if (focused) {
      setIsMapVisible(false);
      setActive(true);
    }
    const path = `/${focused ? `place/${focused.id}` : "search"}`;
    navigate(path, {});
  }, [focused]);

  useEffect(() => {
    if (placeId) {
      dispatch(fetchPlace(placeId));
    }
    dispatch(fetchPlaces(""));
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

  const toggleMapVisibility = () => {
    setIsMapVisible((prev) => !prev);
  };

  const onSubmitFiltersHandler = () => {
    setActive(true);
  };

  return (
    <Carousel
      className={`${isMapVisible ? " !h-[40%] xs:!h-full " : " "} 
      lg:w-[656px] ${active ? " xs:w-[400px]" : " xs:w-[256px] "} ${
        active && focused ? " lg:!w-[800px] xl:!w-[1056px]" : " "
      }`}
    >
      <CarouselItem className="h-full w-full sm:w-[256px]">
        <Filters onSubmit={onSubmitFiltersHandler} />
      </CarouselItem>
      <CarouselItem
        className={
          "h-full w-full bg-white xs:w-[400px] " +
          (active ? "" : "hidden lg:block")
        }
      >
        <div className={!focused ? "lg:hidden" : "xl:hidden"}>
          <NaviButtons
            text="Filters"
            onBack={onCloseResultsHandler}
            isMapVisible={isMapVisible}
            toggleMapVisibility={toggleMapVisibility}
          />
        </div>
        <ResultsList />
      </CarouselItem>
      {active && focused && (
        <CarouselItem className="h-full w-full xs:w-[400px]">
          <div className="box-border h-full !overflow-hidden sm:p-2">
            <div className="h-full overflow-y-auto bg-white sm:rounded-xl sm:border sm:shadow-xl">
              <NaviButtons
                text="Results"
                onBack={onClosePreviewHandler}
                isMapVisible={isMapVisible}
                toggleMapVisibility={toggleMapVisibility}
              />
              <Place place={focused} />
            </div>
          </div>
        </CarouselItem>
      )}
    </Carousel>
  );
};

export { Menu };
