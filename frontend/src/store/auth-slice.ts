import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFreeSlot } from "types/IFreeSlot";
import { IUser } from "types/IUser";
import { loadConfigFromFile } from "vite";

interface AuthSlice {
  modalOpen: boolean;
  user?: IUser;
  loading: boolean;
  message?: string;
  errorMessage?: string;
}

const initialState: AuthSlice = {
  modalOpen: false,
  user: undefined,
  loading: false,
  message: undefined,
  errorMessage: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showModal(state) {
      state.modalOpen = true;
      this.clear(state);
    },
    hideModal(state) {
      state.modalOpen = false;
      this.clear(state);
    },
    clear(state) {
      state.errorMessage = undefined;
      state.message = undefined;
      state.loading = false;
    },
    setUser(state, action: PayloadAction<IUser | undefined>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setMessage(state, action: PayloadAction<string | undefined>) {
      state.message = action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string | undefined>) {
      state.errorMessage = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
