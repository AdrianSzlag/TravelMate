import React, { useEffect, useState } from "react";
import { Map as PigeonMap, Marker, Point, Bounds } from "pigeon-maps";
import useFocus from "../../../store/focus-context";
import useSearch from "../../../store/search-context";

const defaultCenter: Point = [50.06301434728838, 19.941015236678783];
const defaultZoom: number = 13;

export default function Map() {
  const [center, setCenter] = useState<Point>(defaultCenter);
  const [bounds, setBounds] = useState<Bounds>();
  const [zoom, setZoom] = useState<number>(defaultZoom);
  const { focused, setFocused } = useFocus();
  const { results } = useSearch();

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
      let flyTo = [focused.coordinates[1], focused.coordinates[0]] as Point;
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
        {results.map((result) => {
          return (
            <Marker
              key={result.id}
              width={30}
              anchor={[result.coordinates[1], result.coordinates[0]]}
              onClick={() => setFocused(result)}
            />
          );
        })}
      </PigeonMap>
    </div>
  );
}
