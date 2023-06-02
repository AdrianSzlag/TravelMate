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
      const slots = (await fetchData()) as IFreeSlot[];
      console.log(slots);
      dispatch(bookActions.showModal({ slots, placeId, serviceId }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendBookingRequest = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      dispatch(bookActions.setLoading(true));
      const {
        book: { selectedDate, selectedTime, placeId, serviceId },
      } = getState();
      if (!selectedDate || !selectedTime || !placeId || !serviceId) {
        throw new Error("Please fill the form again.");
      }
      const response = await fetchApi("/api/reservation", {
        method: "POST",
        body: JSON.stringify({
          placeId,
          serviceId,
          date: `${selectedDate}T${selectedTime}:00Z`,
        }),
      });
      if (!response.ok) {
        if (response.body) {
          const data = await response.json();
          if (data.message) {
            throw new Error(data.message);
          }
        }
        throw new Error(
          "Booking failed: The selected time slot is no longer available. Please choose another time slot."
        );
      }
      dispatch(bookActions.setMessage("Booking successful!"));
      dispatch(bookActions.setErrorMessage(undefined));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(bookActions.hideModal());
    } catch (error: any) {
      console.log(error);
      dispatch(
        bookActions.setErrorMessage(
          typeof error.message === "string"
            ? error.message
            : "There was a problem, please try again later!"
        )
      );
      dispatch(bookActions.setMessage(undefined));
    }

    dispatch(bookActions.setLoading(false));
  };
};
