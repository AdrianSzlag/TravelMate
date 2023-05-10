interface IPlace {
  id: number;
  name: string;
  description: string;
  type: string;
  thumbnail: string;
  coordinates: [number, number];
}

export type { IPlace };
