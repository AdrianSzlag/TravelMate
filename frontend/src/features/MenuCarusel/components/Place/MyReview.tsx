import { useEffect, useState } from "react";
import UserAvatar from "components/UserAvatar";
import useApi from "hooks/use-api";
import { ServerResponse } from "utils/fetchApi";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { getUser } from "utils/auth";
import Rating from "../Rating";
import { placesActions } from "store/places-slice";
import { IReview } from "types/IReview";
import { IUser } from "types/IUser";

const MyReview = () => {
  const { fetch: upload } = useApi<ServerResponse>("/api/review", {
    method: "POST",
  });
  const { fetch: remove } = useApi<ServerResponse>("/api/review", {
    method: "DELETE",
  });
  const [currentRating, setCurrentRating] = useState<number>(0);
  const [currentComment, setCurrentComment] = useState("");
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.places.focused?.reviews);
  const placeId = useAppSelector((state) => state.places.focused?.id);
  const [edit, setEdit] = useState(false);

  const userId = getUser()?.id;
  const myReview = reviews?.find((review) => review.user.id === userId);
  const { rating, comment } = myReview ?? { rating: 0, comment: "" };

  useEffect(() => {
    if (currentRating > 0 && currentRating !== rating) setEdit(true);
  }, [currentRating]);

  useEffect(() => {
    setCurrentComment(comment ?? "");
    setCurrentRating(rating);
    console.log("rating", rating);
  }, [reviews]);

  const userName = getUser()?.name;

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 126) setCurrentComment(e.target.value);
  };

  const onSubmit = () => {
    if (currentRating === null || !placeId) return;
    upload({
      rating: currentRating,
      comment: currentComment,
      placeId: placeId,
    });
    const review: IReview = {
      rating: currentRating,
      comment: currentComment,
      user: getUser() ?? ({} as IUser),
    };
    dispatch(placesActions.addReview({ placeId: placeId, review }));
    setEdit(false);
  };

  const onDelete = () => {
    if (currentRating === null || !placeId) return;
    remove({
      placeId: placeId,
    });
    dispatch(
      placesActions.removeReview({
        placeId: placeId,
        userId: getUser()?.id ?? "",
      })
    );
    setEdit(false);
  };

  const onCancelUpdate = () => {
    setEdit(false);
    setCurrentRating(rating ?? 0);
    setCurrentComment(comment ?? "");
  };

  return (
    <div className="border-b py-2">
      <label className="text-sm font-semibold text-gray-400">
        {edit && "Edit your review"}
        {!edit && (rating ? "Your review:" : "Rate this place")}
      </label>
      <div className="flex w-full pt-1">
        <UserAvatar userId={userName ?? ""} />
        <div className="pl-2">
          <div className="font-semibold text-gray-600">{userName}</div>
          <Rating rating={currentRating} setRating={setCurrentRating} />
        </div>
      </div>
      {!edit && currentComment && (
        <div className="w-full px-1 pt-2 text-gray-600 text-sm font-semibold">
          {currentComment}
        </div>
      )}
      {edit && (
        <>
          <label
            htmlFor="comment"
            className="block py-1 text-gray-400 text-sm font-semibold"
          >
            Add a comment:
          </label>
          <textarea
            className="h-20 w-full resize-none rounded border px-0.5 text-gray-600 text-sm font-semibold"
            id="comment"
            value={currentComment}
            onChange={onCommentChange}
          />
        </>
      )}
      <div className="flex justify-end gap-2 px-1 pt-1 text-blue-600 text-sm font-semibold">
        {edit && (
          <>
            <button className="cursor-pointer" onClick={onCancelUpdate}>
              Cancel
            </button>
            <button className="cursor-pointer" onClick={onSubmit}>
              Submit
            </button>
          </>
        )}
        {!edit && rating > 0 && (
          <>
            <button className="cursor-pointer" onClick={() => setEdit(true)}>
              Edit
            </button>
            <button className="cursor-pointer" onClick={onDelete}>
              Remove
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyReview;
