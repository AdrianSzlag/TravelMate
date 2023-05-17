import React, { useEffect, useState } from "react";
import { Map as PigeonMap, Marker, Point, Bounds } from "pigeon-maps";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { IPlace } from "../../../types/IPlace";
import { placesActions } from "../../../store/places-slice";

const defaultCenter: Point = [50.06301434728838, 19.941015236678783];
const defaultZoom: number = 13;

export default function Map() {
  const dispatch = useAppDispatch();
  const places = useAppSelector((state) => state.places.places);
  const focused = useAppSelector((state) => state.places.focused);
  const setFocused = (place: IPlace | null) =>
    dispatch(placesActions.setFocused(null));

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
    if (focused) {
      let flyTo = [
        focused.location.coordinates[1],
        focused.location.coordinates[0],
      ] as Point;
      setCenter(flyTo);
      setZoom(16);
    } else {
      setCenter(defaultCenter);
      setZoom(defaultZoom);
    }
  }, [focused]);

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
                place.location.coordinates[1],
                place.location.coordinates[0],
              ]}
              onClick={() => setFocused(place)}
            />
          );
        })}
      </PigeonMap>
    </div>
  );
}
