import { AppThunk } from "store";
import { IFreeSlot } from "types/IFreeSlot";
import fetchApi from "utils/fetchApi";
import { bookActions } from "./book-slice";

export const showBookingModal = (
  placeId: string,
  serviceId: string
): AppThunk => {
  return async (dispatch, getState) => {
    const fetchData = async () => {
      const response = await fetchApi(`/api/reservation/${placeId}`, {
        method: "POST",
        body: JSON.stringify({ serviceId }),
      });
      if (!response.ok) {
        throw new Error("Could not fetch service data!");
      }
      const data = await response.json();
      return data;
    };
    try {
      const slots = (await fetchData()) as {
        date: string;
        slots: { start: string; end: string }[];
      }[];
      const freeSlots: IFreeSlot[] = slots.map((slot) => ({
        date: new Date(slot.date),
        slots: slot.slots,
      }));
      dispatch(bookActions.setFreeSlots(freeSlots));
    } catch (error) {
      console.log(error);
    }
  };
};
