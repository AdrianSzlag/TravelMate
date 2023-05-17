import { AppThunk } from ".";
import { IPlace } from "../types/IPlace";
import fetchApi from "../utils/fetchApi";
import { placesActions } from "./places-slice";

export const fetchPlaces = (searchQuery: string): AppThunk => {
  console.log("fetchPlaces");
  return async (dispatch, getState) => {
    const fetchData = async () => {
      const response = await fetchApi("/api/search", {
        method: "POST",
        body: JSON.stringify({ searchQuery }),
      });

      if (!response.ok) {
        throw new Error("Could not fetch places!");
      }

      const data = await response.json();

      return data;
    };
    try {
      const placesData = (await fetchData()) as IPlace[];
      dispatch(placesActions.setPlaces(placesData));
    } catch (error) {
      dispatch(placesActions.setPlaces([]));
    }
  };
};
