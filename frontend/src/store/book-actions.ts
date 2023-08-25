import { AppThunk } from "store";
import { IFreeSlot } from "types/IFreeSlot";
import fetchApi from "utils/fetchApi";
import { bookActions } from "./book-slice";
import { fetchReservations } from "./reservations-actions";
import { isLoggedIn } from "utils/auth";
import { authActions } from "./auth-slice";
import { getDateString, getTime } from "utils/dateTime";

export const showBookingModal = (
  placeId: string,
  serviceId: string
): AppThunk => {
  return async (dispatch, getState) => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams();
      searchParams.append("serviceId", serviceId);
      searchParams.append("placeId", placeId);
      const response = await fetchApi(
        `/api/reservation/available?${searchParams}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Could not fetch service data!");
      }
      const data = await response.json();
      return data;
    };
    if (!isLoggedIn()) {
      dispatch(authActions.showModal());
      return;
    }
    try {
      const slots = (await fetchData()) as IFreeSlot[];
      slots.sort((a, b) => a.localeCompare(b));
      dispatch(
        bookActions.showBookingModal({
          slots,
          placeId,
          serviceId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const showEditingModal = (
  id: string,
  placeId: string,
  serviceId: string,
  selectedDate: IFreeSlot
): AppThunk => {
  return async (dispatch, getState) => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams();
      searchParams.append("serviceId", serviceId);
      searchParams.append("placeId", placeId);
      const response = await fetchApi(
        `/api/reservation/available?${searchParams}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Could not fetch service data!");
      }
      const data = await response.json();
      return data;
    };
    if (!isLoggedIn()) {
      dispatch(authActions.showModal());
      return;
    }
    try {
      const slots = (await fetchData()) as IFreeSlot[];
      console.log(slots);
      slots.push(selectedDate);
      slots.sort((a, b) => a.localeCompare(b));
      dispatch(
        bookActions.showEditingModal({
          editId: id,
          slots,
          placeId,
          serviceId,
          additionalDate: selectedDate,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendBookingRequest = (): AppThunk => {
  return async (dispatch, getState) => {
    if (!isLoggedIn()) {
      dispatch(authActions.showModal());
      return;
    }
    try {
      dispatch(bookActions.setLoading(true));
      const isEditing = getState().book.isEditing;
      const {
        book: { selectedDate, selectedTime, placeId, serviceId },
      } = getState();
      if (!selectedDate || !selectedTime || !placeId || !serviceId) {
        throw new Error("Please fill the form again.");
      }
      const method = isEditing ? "PUT" : "POST";
      const path = isEditing
        ? `/api/reservation/${getState().book.editId}`
        : "/api/reservation";
      console.log(path);
      const response = await fetchApi(path, {
        method,
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
      dispatch(fetchReservations());
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
