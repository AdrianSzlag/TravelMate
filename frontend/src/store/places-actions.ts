import { AppThunk } from ".";
import { IPlace } from "../types/IPlace";
import fetchApi from "../utils/fetchApi";
import { placesActions } from "./places-slice";

export const fetchPlaces = (searchQuery: string): AppThunk => {
  return async (dispatch, getState) => {
    const fetchData = async () => {
      const url = `/api/place/search?search=${searchQuery}`;
      const response = await fetchApi(url, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Could not fetch places!");
      }
      const data = await response.json();
      return data;
    };
    try {
      const placesData = (await fetchData()) as IPlace[];
      console.log(placesData);
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

export const deleteService = (placeId: string, serviceId: string): AppThunk => {
  return async (dispatch, getState) => {
    const fetchData = async () => {
      const response = await fetchApi(
        `/api/place/${placeId}/service/${serviceId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Could not delete service!");
      }
      const data = await response.json();
      return data;
    };
    try {
      await fetchData();
      dispatch(fetchPlace(placeId));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteMenuItem = (
  placeId: string,
  menuItemId: string
): AppThunk => {
  return async (dispatch, getState) => {
    const fetchData = async () => {
      const response = await fetchApi(
        `/api/place/${placeId}/menu/${menuItemId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Could not delete menu item!");
      }
      const data = await response.json();
      return data;
    };
    try {
      await fetchData();
      dispatch(fetchPlace(placeId));
    } catch (error) {
      console.log(error);
    }
  };
};
