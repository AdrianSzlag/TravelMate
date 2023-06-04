import { useEffect, useState } from "react";
import { Map as PigeonMap, Marker, Point, Bounds } from "pigeon-maps";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { IPlace } from "types/IPlace";
import { placesActions } from "store/places-slice";
import { IReservation } from "types/IReservation";
import { reservationsActions } from "store/reservations-slice";

const defaultCenter: Point = [50.06301434728838, 19.941015236678783];
const defaultZoom: number = 13;

export default function ReservationsMap() {
  const reservations = useAppSelector(
    (state) => state.reservations.reservations
  );
  const selected = useAppSelector((state) => state.reservations.selected);
  const dispatch = useAppDispatch();

  const [center, setCenter] = useState<Point>(defaultCenter);
  const [bounds, setBounds] = useState<Bounds>();
  const [zoom, setZoom] = useState<number>(defaultZoom);

  const onBoundariesChangeHandler = ({
    center,
    zoom,
    bounds,
    initial,
  }: {
    center: [number, number];
    bounds: Bounds;
    zoom: number;
    initial: boolean;
  }) => {
    setCenter(center);
    setBounds(bounds);
    setZoom(zoom);
  };

  useEffect(() => {
    if (selected) {
      let flyTo = [
        selected.place.location.coordinates[1],
        selected.place.location.coordinates[0],
      ] as Point;
      setCenter(flyTo);
      setZoom(16);
    } else {
      setCenter(defaultCenter);
      setZoom(defaultZoom);
    }
  }, [selected]);

  const places = reservations.reduce((acc: IReservation[], reservation) => {
    if (!acc.find((res) => res.place.id === reservation.place.id)) {
      acc.push(reservation);
    }
    return acc;
  }, []);

  const setFocused = (id: string) => {
    dispatch(reservationsActions.setSelected(id));
  };

  return (
    <div className="min-h-0 flex-shrink flex-grow">
      <PigeonMap
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        center={center}
        onBoundsChanged={onBoundariesChangeHandler}
        maxZoom={16}
        minZoom={11}
        zoom={zoom}
      >
        {places.map((place) => {
          return (
            <Marker
              key={place.id}
              width={30}
              anchor={[
                place.place.location.coordinates[1],
                place.place.location.coordinates[0],
              ]}
              onClick={() => setFocused(place.id)}
            />
          );
        })}
      </PigeonMap>
    </div>
  );
}
