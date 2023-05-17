import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPlace } from "../types/IPlace";


export interface PlacesState {
  places: IPlace[];
  focusedPlace: IPlace | null;
}

const initialState: PlacesState = {
  places: [],
  focusedPlace: null,
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setPlaces(state, action: PayloadAction<IPlace[]>) {
      state.places = action.payload;
      if (state.focusedPlace)
        state.focusedPlace = action.payload.find(
          (place) => place.id === state.focusedPlace?.id
        )!;
    },
    setFocusedPlace(state, action: PayloadAction<IPlace>) {
      const place = state.places.find(
        (place) => place.id === action.payload.id
      );
      if (place) state.focusedPlace = place;
      else state.focusedPlace = null;
    },
  },
});

export const placesActions = placesSlice.actions;
export default placesSlice.reducer;
