import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IReservation } from "types/IReservation";

interface ReservationsSlice {
  reservations: IReservation[];
  selected?: IReservation;
}

const initialState: ReservationsSlice = {
  reservations: [],
  selected: undefined,
};

const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    setReservations(state, action: PayloadAction<IReservation[]>) {
      state.reservations = action.payload;
      state.selected = undefined;
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
