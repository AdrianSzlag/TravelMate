import { ILocation } from "../models/ILocation";
import { IReview } from "../models/IReview";

export interface IPlaceDTO {
  id: string;
  name: string;
  description?: string;
  type: string;
  thumbnail: string;
  rating?: number;
  reviews: IReview[];
  location: ILocation;
}
