export type IFreeSlot = {
  date: Date;
  slots: {
    start: string;
    end: string;
  }[];
};
