import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { useEffect, useState } from "react";
import Map, { Marker, ViewStateChangeEvent } from "react-map-gl/maplibre";
import { PiMapPinFill } from "react-icons/pi";
import { IReservation } from "types/IReservation";
import { reservationsActions } from "store/reservations-slice";

export default function ReservationsMap() {
  const reservations = useAppSelector(
    (state) => state.reservations.reservations
  );
  const selected = useAppSelector((state) => state.reservations.selected);
  const filter = useAppSelector((state) => state.reservations.filter);
  const userId = useAppSelector((state) => state.auth.user?.id);
  const dispatch = useAppDispatch();
  const setFocused = (id: string) => {
    dispatch(reservationsActions.setSelected(id));
  };

  const [viewState, setViewState] = useState({
    longitude: 19.941015236678783,
    latitude: 50.06301434728838,
    zoom: 11,
  });

  const onMoveHandler = (evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  };

  const places = reservations.reduce((acc: IReservation[], reservation) => {
    if (!acc.find((res) => res.place.id === reservation.place.id)) {
      acc.push(reservation);
    }
    return acc;
  }, []);

  useEffect(() => {
    if (selected) {
      setViewState({
        ...viewState,
        longitude: selected.place.location.coordinates[0],
        latitude: selected.place.location.coordinates[1],
        zoom: 14,
      });
    }
  }, [selected]);

  return (
    <div className="h-full min-h-0 w-full min-w-0 overflow-hidden">
      <Map
        {...viewState}
        onMove={onMoveHandler}
        mapStyle="https://api.maptiler.com/maps/basic-v2/style.json?key=u0kFdoythHBvPdgFbgqj"
      >
        {places
          .filter(
            (reservation) =>
              reservation.place.id === filter || filter === undefined
          )
          .map((place) => {
            return (
              <Marker
                key={place.id}
                longitude={place.place.location.coordinates[0]}
                latitude={place.place.location.coordinates[1]}
                anchor="bottom"
                onClick={() => setFocused(place.id)}
                className="relative"
              >
                <div className=" text-outline !font-semi absolute bottom-0 right-full top-1/2 -translate-y-1/2 cursor-pointer whitespace-nowrap text-xs font-semibold  text-black">
                  {place.place.name}
                </div>
                <PiMapPinFill
                  className={
                    "h-8 w-8 cursor-pointer  drop-shadow-[0_0_4px_rgba(255,255,255,1)] hover:drop-shadow-[0_0_4px_rgba(0,0,0,0.3)] " +
                    (new Date(place.date).getTime() < Date.now()
                      ? "text-gray-600"
                      : place.place.owner !== userId
                      ? "text-blue-600"
                      : "text-red-600")
                  }
                />
              </Marker>
            );
          })}
      </Map>
    </div>
  );
}
