import { ILocation } from "./ILocation";
import IMenuItem from "./IMenuItem";
import { IReview } from "./IReview";
import IService from "./IService";
import { IUser } from "./IUser";

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
  menu: IMenuItem[];
  createdBy: IUser;
}

export default IPlace;
