import fetchApi from "utils/fetchApi";
import { AppThunk } from ".";
import IBusiness from "types/IBusiness";
import { businessActions } from "./business-slice";

export const postBusiness = (
  business: IBusiness,
  thumbnail: File,
  images: File[]
): AppThunk => {
  return async (dispatch) => {
    dispatch(businessActions.setLoading(true));
    try {
      const formData = new FormData();
      formData.append("business", JSON.stringify(business));
      formData.append("thumbnail", thumbnail);
      if (images) {
        images.forEach((image) => {
          formData.append("images", image);
        });
      }
      const response = await fetchApi("/api/user/business", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      dispatch(businessActions.hideModal());
    } catch (error) {
      console.log(error);
    }
    dispatch(businessActions.setLoading(false));
  };
};
