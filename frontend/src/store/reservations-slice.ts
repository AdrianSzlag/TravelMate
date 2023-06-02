import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IReservation } from "types/IReservation";

interface ReservationsSlice {
  reservations: IReservation[];
}

const initialState: ReservationsSlice = {
  reservations: [],
};

const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    setReservations(state, action: PayloadAction<IReservation[]>) {
      state.reservations = action.payload;
    },
    addReservation(state, action: PayloadAction<IReservation>) {
      state.reservations.push(action.payload);
    },
  },
});

export const reservationsActions = reservationsSlice.actions;
export default reservationsSlice.reducer;
