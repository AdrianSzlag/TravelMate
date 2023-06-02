import { AnyAction, ThunkAction, configureStore } from "@reduxjs/toolkit";

import placesReducer from "./places-slice";
import bookSlice from "./book-slice";
import authSlice from "./auth-slice";
import reservationsSlice from "./reservations-slice";

const store = configureStore({
  reducer: {
    places: placesReducer,
    book: bookSlice,
    auth: authSlice,
    reservations: reservationsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;
export default store;
