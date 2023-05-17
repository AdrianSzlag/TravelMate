import { ILocation } from "./ILocation";
import { IReview } from "./IReview";

export interface IPlace {
  id: string;
  name: string;
  description?: string;
  type: string;
  thumbnail: string;
  rating?: number;
  reviews: IReview[];
  location: ILocation;
}
