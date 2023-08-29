import { useEffect, useState } from "react";
import Filters from "./components/FiltersCard";
import ResultsList from "./components/ResultsCard";
import Carousel from "./components/Carousel";
import CarouselItem from "./components/CarouselItem";
import Place from "./components/PlaceCard";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { placesActions } from "store/places-slice";
import { IPlace } from "types/IPlace";
import { useParams, useLocation } from "react-router-dom";
import { fetchPlace, fetchPlaces } from "store/places-actions";
import { useAppNavigate } from "hooks/use-navigate";
import { IoMdArrowRoundBack, IoMdArrowRoundUp } from "react-icons/io";
import { IoClose } from "react-icons/io5";

interface Props {
  minimized: boolean;
  toggleScroll: () => void;
  lockScroll: (lock: boolean) => void;
}

const Menu = ({ minimized, toggleScroll, lockScroll }: Props) => {
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
    if (minimized && !active) toggleScroll();
  }, [minimized, active]);

  useEffect(() => {
    lockScroll(!active);
  }, [active]);

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

  const maximize = () => {
    minimized && toggleScroll();
  };

  return (
    <Carousel
      className={`h-full lg:w-[656px] ${
        active ? " xs:w-[400px]" : " xs:w-[256px] "
      } ${active && focused ? " lg:!w-[800px] xl:!w-[1056px]" : " "}`}
    >
      <CarouselItem className="h-full w-full sm:w-[256px]">
        <Filters onSubmit={onSubmitFiltersHandler} />
      </CarouselItem>
      <CarouselItem
        className={
          "h-full w-full bg-white xs:w-[400px] " +
          (active ? "" : "hidden lg:block")
        }
        onClick={maximize}
      >
        <ResultsList onFiltersClick={onCloseResultsHandler} />
      </CarouselItem>
      {active && focused && (
        <CarouselItem
          className="h-full w-full xs:w-[400px] "
          onClick={maximize}
        >
          <div className="box-border h-full !overflow-hidden sm:px-2 sm:py-3">
            <div
              className={
                "relative h-full bg-white sm:rounded-xl sm:border sm:shadow-xl " +
                (minimized
                  ? "overflow-hidden xs:overflow-auto"
                  : "overflow-auto")
              }
            >
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
              <Place place={focused} minimized={minimized} />
            </div>
          </div>
        </CarouselItem>
      )}
    </Carousel>
  );
};

export { Menu };
