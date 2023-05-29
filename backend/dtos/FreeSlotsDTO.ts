export type IFreeSlotsDTO = {
  date: Date;
  slots: {
    start: string;
    end: string;
  }[];
};
