import { useEffect, useRef, useState } from "react";
import { Map as PigeonMap, Marker, Point, Bounds } from "pigeon-maps";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { IPlace } from "types/IPlace";
import { placesActions } from "store/places-slice";

const defaultCenter: Point = [50.06301434728838, 19.941015236678783];
const defaultZoom: number = 13;

export default function Map() {
  const dispatch = useAppDispatch();
  const places = useAppSelector((state) => state.places.places);
  const focused = useAppSelector((state) => state.places.focused);
  const setFocused = (place: IPlace | null) =>
    dispatch(placesActions.setFocused(place));

  const [currentCenter, setCurrentCenter] = useState<Point>(defaultCenter);
  const [currentBounds, setCurrentBounds] = useState<Bounds>();
  const [currentZoom, setCurrentZoom] = useState<number>(defaultZoom);
  const containerRef = useRef<HTMLDivElement>(null);

  const flyTo = (center: Point, offset: [number, number], zoom: number) => {
    let flyTo = [center[0], center[1]] as Point;
    if (currentBounds && containerRef.current) {
      const zoomDiff = zoom - currentZoom;
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const boundsWidth = currentBounds.ne[1] - currentBounds.sw[1];
      const boundsHeight = currentBounds.ne[0] - currentBounds.sw[0];
      const lngPixelRatio = boundsWidth / containerWidth;
      const latPixelRatio = boundsHeight / containerHeight;
      const offsetX =
        containerWidth > 10
          ? (offset[0] * lngPixelRatio) / Math.pow(2, zoomDiff)
          : 0;
      const offsetY =
        containerHeight > 10
          ? (offset[1] * latPixelRatio) / Math.pow(2, zoomDiff)
          : 0;
      flyTo = [center[0] - offsetY, center[1] - offsetX] as Point;
    }
    setCurrentCenter(flyTo);
    setCurrentZoom(zoom);
  };

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
    setCurrentCenter(center);
    setCurrentBounds(bounds);
    setCurrentZoom(zoom);
  };

  useEffect(() => {
    if (focused && containerRef.current) {
      const mapWidth = containerRef.current.offsetWidth;
      const menuWidth =
        mapWidth >= 1280
          ? 1056
          : mapWidth >= 1024
          ? 800
          : mapWidth >= 475
          ? 400
          : 0;
      const viewport = mapWidth - menuWidth;
      const offsetX = mapWidth / 2 - viewport / 2;
      console.log(mapWidth, menuWidth, viewport, offsetX);
      flyTo(
        [focused.location.coordinates[1], focused.location.coordinates[0]],
        [offsetX, 0],
        14
      );
    } else {
      //setCurrentCenter(defaultCenter);
      //setZoom(defaultZoom);
    }
  }, [focused]);

  return (
    <div
      className="h-full min-h-0 w-full min-w-0 overflow-hidden"
      ref={containerRef}
    >
      <PigeonMap
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        center={currentCenter}
        onBoundsChanged={onBoundariesChangeHandler}
        maxZoom={16}
        minZoom={11}
        zoom={currentZoom}
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
              color="#1d4ed8"
            />
          );
        })}
      </PigeonMap>
    </div>
  );
}
