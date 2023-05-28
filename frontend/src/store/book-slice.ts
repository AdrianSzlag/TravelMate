import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BookState {
  modalOpen: boolean;
}

const initialState: BookState = {
  modalOpen: true,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    showModal(state) {
      state.modalOpen = true;
    },
    hideModal(state) {
      state.modalOpen = false;
    },
  },
});

export const placesActions = bookSlice.actions;
export default bookSlice.reducer;
