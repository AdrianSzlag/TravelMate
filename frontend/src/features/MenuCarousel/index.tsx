import { useEffect, useState } from "react";
import Filters from "./components/FiltersCard";
import ResultsList from "./components/ResultsCard";
import { Carousel, CarouselItem } from "./components/Carousel";
import Place from "./components/PlaceCard";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { placesActions } from "store/places-slice";
import { IPlace } from "types/IPlace";
import { useParams, useLocation } from "react-router-dom";
import { fetchPlace, fetchPlaces } from "store/places-actions";
import { useAppNavigate } from "hooks/use-navigate";
import { IoMdArrowRoundUp } from "react-icons/io";
import { IoClose } from "react-icons/io5";

interface Props {
  minimized: boolean;
  maximize: () => void;
  setScrollLock: (lock: boolean) => void;
}

const Menu = ({ minimized, maximize, setScrollLock }: Props) => {
  const dispatch = useAppDispatch();
  const focused = useAppSelector((state) => state.places.focused);
  const navigate = useAppNavigate();
  const { placeId } = useParams();
  const { pathname } = useLocation();

  const [active, setActive] = useState(
    pathname.startsWith("/search") ||
      pathname.startsWith("/place") ||
      pathname.startsWith("/")
  );

  useEffect(() => {
    if (focused) {
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

  useEffect(() => {
    if (minimized && !active) maximize();
    setScrollLock(!active);
  }, [minimized, active]);

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

  const onSubmitFiltersHandler = () => {
    setActive(true);
  };

  return (
    <Carousel
      className={`min-h-full w-full xs:absolute xs:h-full xs:max-h-full lg:w-[656px] ${
        active ? " xs:w-[400px]" : " xs:w-[256px] "
      } ${active && focused ? " lg:!w-[800px] xl:!w-[1056px]" : " "}`}
    >
      <CarouselItem className="w-full !bg-gray-100 xs:h-full sm:w-[256px]">
        <Filters onSubmit={onSubmitFiltersHandler} />
      </CarouselItem>
      <CarouselItem
        className={
          "w-full !bg-white xs:h-full xs:w-[400px] " +
          (active ? "" : "hidden lg:block")
        }
        onClick={maximize}
      >
        <ResultsList onFiltersClick={onCloseResultsHandler} />
      </CarouselItem>
      {active && focused && (
        <CarouselItem
          className="w-full xs:h-full xs:w-[400px]"
          onClick={maximize}
        >
          <div className="h-full sm:px-2 sm:py-3">
            <div className="relative bg-white xs:h-full xs:overflow-auto sm:rounded-xl sm:border sm:shadow-xl">
              <div className="absolute flex w-full justify-end">
                <button
                  onClick={onClosePreviewHandler}
                  className={
                    "m-2 items-center rounded-full border bg-white p-0.5 font-bold text-gray-500 shadow-xl hover:text-gray-800 " +
                    (minimized ? "hidden xs:flex" : "flex")
                  }
                >
                  <IoClose className="h-7 w-7 text-gray-600" />
                </button>
                <button
                  onClick={maximize}
                  className={
                    "m-2 items-center p-0.5 font-bold text-gray-500 hover:text-gray-800 " +
                    (minimized ? "flex xs:hidden" : "hidden")
                  }
                >
                  <IoMdArrowRoundUp className="h-7 w-7 text-gray-600" />
                </button>
              </div>
              <Place place={focused} minimized={false} />
            </div>
          </div>
        </CarouselItem>
      )}
    </Carousel>
  );
};

export { Menu };
