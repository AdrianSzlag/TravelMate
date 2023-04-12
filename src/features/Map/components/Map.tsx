import React from "react";
import { Map as PigeonMap, Marker, Point } from "pigeon-maps";

const defaultCenter: Point = [50.04, 19.94];
const defaultZoom: number = 11;

export default function Map() {
  return (
    <div className="min-h-0 flex-shrink flex-grow">
      <PigeonMap defaultCenter={defaultCenter} defaultZoom={defaultZoom} >
        <Marker width={50} anchor={[50.04, 19.94]} />
      </PigeonMap>
    </div>
  );
}
