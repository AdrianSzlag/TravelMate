import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BusinessState {
  modalOpen: boolean;
  loading: boolean;
}

const initialState: BusinessState = {
  modalOpen: false,
  loading: false,
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    showModal(state) {
      state.modalOpen = true;
      state.loading = false;
    },
    hideModal(state) {
      state.modalOpen = false;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const businessActions = businessSlice.actions;
export default businessSlice.reducer;
