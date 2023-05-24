import { AppThunk } from ".";
import { IPlace } from "../types/IPlace";
import fetchApi from "../utils/fetchApi";
import { placesActions } from "./places-slice";

export const fetchPlaces = (searchQuery: string): AppThunk => {
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

export const fetchPlace = (placeId: string): AppThunk => {
  return async (dispatch, getState) => {
    const fetchData = async () => {
      const response = await fetchApi(`/api/place/${placeId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Could not fetch place!");
      }

      const data = await response.json();

      return data;
    };
    try {
      const placeData = (await fetchData()) as IPlace;
      dispatch(placesActions.setFocused(placeData));
    } catch (error) {
      console.log(error);
    }
  };
};
