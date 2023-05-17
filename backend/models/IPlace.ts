import { IContactInfo } from "./IContactInfo";
import { ILocation } from "./ILocation";
import { IReservation } from "./IReservation";
import { IReview } from "./IReview";
import { IService } from "./IService";

export interface IPlace {
  _id: string;
  name: string;
  type: string;
  description?: string;
  address?: string;
  location: ILocation;
  thumbnail: string;
  images?: string[];
  createdBy: string;
  contactInfo: IContactInfo;
  tags?: string[];
  services: IService[];
  reservations: IReservation[];
  reviews: IReview[];
}
