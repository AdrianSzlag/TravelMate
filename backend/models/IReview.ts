import { IUser } from "./IUser";

export type IReview = {
  user: string | IUser;
  rating: number;
  comment?: string;
};
