import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IReservation } from "types/IReservation";

interface ReservationsSlice {
  reservations: IReservation[];
  selected?: IReservation;
  cancelModalOpen: boolean;
  filter?: string;
}

const initialState: ReservationsSlice = {
  reservations: [],
  selected: undefined,
  cancelModalOpen: false,
  filter: undefined,
};

const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string | undefined>) {
      state.filter = action.payload;
    },
    openCancelModal(state, action: PayloadAction<IReservation>) {
      state.selected = state.reservations.find(
        (reservation) => reservation.id === action.payload.id
      );
      if (state.selected) {
        state.cancelModalOpen = true;
      }
    },
    closeCancelModal(state) {
      state.cancelModalOpen = false;
    },
    setReservations(state, action: PayloadAction<IReservation[]>) {
      state.reservations = action.payload;
      state.selected = undefined;
      state.cancelModalOpen = false;
      state.filter = undefined;
    },
    addReservation(state, action: PayloadAction<IReservation>) {
      state.reservations.push(action.payload);
    },
    setSelected(state, action: PayloadAction<string | undefined>) {
      state.selected = state.reservations.find(
        (reservation) => reservation.id === action.payload
      );
    },
  },
});

export const reservationsActions = reservationsSlice.actions;
export default reservationsSlice.reducer;
