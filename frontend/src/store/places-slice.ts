import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPlace } from "../types/IPlace";

export interface PlacesState {
  places: IPlace[];
  focused: IPlace | null;
}

const initialState: PlacesState = {
  places: [],
  focused: null,
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setPlaces(state, action: PayloadAction<IPlace[]>) {
      state.places = action.payload;
      if (state.focused) {
        if (!state.places.find((place) => place.id === state.focused?.id)) {
          state.places.push(state.focused);
        }
      }
    },
    setFocused(state, action: PayloadAction<IPlace | null>) {
      console.log(action.payload);
      if (!action.payload) {
        state.focused = null;
        return;
      }
      state.focused = action.payload;

      const id = action.payload.id;
      const place = state.places.find((place) => place.id === id);
      if (!place) {
        state.places.push(action.payload);
      }
    },
  },
});

export const placesActions = placesSlice.actions;
export default placesSlice.reducer;
