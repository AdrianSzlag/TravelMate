import { ILocation } from "./ILocation";
import { IReview } from "./IReview";
import IService from "./IService";

export interface IPlace {
  id: string;
  name: string;
  description?: string;
  type: string;
  thumbnail: string;
  rating?: number;
  reviews: IReview[];
  location: ILocation;
  services: IService[];
}

export default IPlace;
