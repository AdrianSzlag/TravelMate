interface IPlace {
  _id: number;
  name: string;
  description: string;
  type: string;
  thumbnail: string;
  location: {
    type: string;
    coordinates: number[];
  };
}

export type { IPlace };
