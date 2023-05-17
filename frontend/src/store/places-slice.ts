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
      console.log(action);
      state.places = action.payload;
      if (state.focused)
        state.focused = action.payload.find(
          (place) => place.id === state.focused?.id
        )!;
    },
    setFocused(state, action: PayloadAction<IPlace | null>) {
      if (!action.payload) {
        state.focused = null;
        return;
      }
      const id = action.payload.id;
      const place = state.places.find((place) => place.id === id);
      if (place) state.focused = place;
      else state.focused = null;
    },
  },
});

export const placesActions = placesSlice.actions;
export default placesSlice.reducer;
