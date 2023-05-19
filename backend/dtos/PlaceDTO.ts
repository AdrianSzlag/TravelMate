import { ILocation } from "../models/ILocation";
import { IReview } from "../models/IReview";
import IServiceDTO from "./ServiceDTO";

export interface IPlaceDTO {
  id: string;
  name: string;
  description?: string;
  type: string;
  thumbnail: string;
  rating?: number;
  reviews: IReview[];
  services: IServiceDTO[];
  location: ILocation;
}

export default IPlaceDTO;
