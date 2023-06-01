import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFreeSlot } from "types/IFreeSlot";

interface BookState {
  modalOpen: boolean;
  freeSlots: IFreeSlot[];
  selectedDate?: string;
  selectedTime?: string;
  placeId?: string;
  serviceId?: string;
}

const initialState: BookState = {
  modalOpen: false,
  freeSlots: [],
  selectedDate: undefined,
  selectedTime: undefined,
  placeId: undefined,
  serviceId: undefined,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    showModal(
      state,
      action: PayloadAction<{
        slots: IFreeSlot[];
        placeId: string;
        serviceId: string;
      }>
    ) {
      state.modalOpen = true;
      state.freeSlots = action.payload.slots;
      state.placeId = action.payload.placeId;
      state.serviceId = action.payload.serviceId;
    },
    setDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
      state.selectedTime = undefined;
    },
    setTime(state, action: PayloadAction<string>) {
      state.selectedTime = action.payload;
    },
    hideModal(state) {
      state.modalOpen = false;
      state.freeSlots = [];
      state.selectedDate = undefined;
      state.selectedTime = undefined;
      state.placeId = undefined;
      state.serviceId = undefined;
    },
  },
});

export const bookActions = bookSlice.actions;
export default bookSlice.reducer;
