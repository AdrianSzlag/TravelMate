import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFreeSlot } from "types/IFreeSlot";

interface BookState {
  modalOpen: boolean;
  freeSlots: IFreeSlot[];
  selectedDate?: Date;
  selectedTime?: string;
}

const initialState: BookState = {
  modalOpen: false,
  freeSlots: [],
  selectedDate: undefined,
  selectedTime: undefined,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    showModal(state) {
      state.modalOpen = true;
    },
    setFreeSlots(state, action: PayloadAction<IFreeSlot[]>) {
      state.freeSlots = action.payload;
      state.modalOpen = true;
    },
    setDate(state, action: PayloadAction<Date>) {
      state.selectedDate = action.payload;
    },
    setTime(state, action: PayloadAction<string>) {
      state.selectedTime = action.payload;
    },
    hideModal(state) {
      state.modalOpen = false;
      state.freeSlots = [];
      state.selectedDate = undefined;
      state.selectedTime = undefined;
    },
  },
});

export const bookActions = bookSlice.actions;
export default bookSlice.reducer;
