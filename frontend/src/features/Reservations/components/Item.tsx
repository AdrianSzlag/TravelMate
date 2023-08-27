import { useAppDispatch } from "hooks/redux-hooks";
import { getMonthName, getTime } from "utils/dateTime";
import { Link } from "react-router-dom";
import Img from "components/Img";
import { showEditingModal } from "store/book-actions";

interface ItemProps {
  id: string;
  serviceId: string;
  placeId: string;
  title: string;
  address?: string;
  name: string;
  image?: string;
  date: string;
  selected: boolean;
  onClick: () => void;
  onCancel: () => void;
  bookAgain?: boolean;
}
const Item = ({
  id,
  placeId,
  serviceId,
  title,
  address,
  name,
  image,
  date,
  onClick,
  onCancel,
  bookAgain = false,
}: ItemProps) => {
  const dispatch = useAppDispatch();
  const dateObj = date ? new Date(date) : undefined;
  const isDone = dateObj ? dateObj.getTime() < Date.now() : false;
  const onCancelClickHandler = () => onCancel();
  const openEditModal = () => {
    dispatch(showEditingModal(id, placeId, serviceId, date));
    console.log("open edit modal");
  };
  return (
    <div
      className="m-4 box-border flex rounded border shadow"
      onClick={onClick}
    >
      <div className="flex flex-1 flex-col gap-2 p-4">
        {isDone && (
          <div className="inline-block w-fit rounded bg-gray-200 px-2 py-0.5 text-sm font-semibold ">
            Ended
          </div>
        )}
        <h1 className="-my-1 text-lg font-semibold text-gray-800">{title}</h1>
        {address && (
          <h6 className="text-sm font-semibold text-gray-400">{address}</h6>
        )}
        <Link
          className="flex flex-row items-center"
          to={`/place/${placeId}?details=overview`}
        >
          {image && (
            <Img
              src={"/" + image}
              alt={name}
              className="mr-2 h-5 w-5 rounded-full"
            />
          )}
          <h3 className="font-semibold text-gray-600">{name}</h3>
        </Link>
        <div className="flex gap-2">
          {!isDone && (
            <>
              <button
                className="rounded bg-red-500 px-2 py-0.5 text-sm font-semibold text-white"
                onClick={onCancelClickHandler}
              >
                Cancel
              </button>
              <button
                className="rounded bg-gray-500 px-2 py-0.5 text-sm font-semibold text-white"
                onClick={openEditModal}
              >
                Edit
              </button>
            </>
          )}
          {isDone && bookAgain && (
            <Link
              className="rounded bg-blue-500 px-2 py-0.5 text-sm font-semibold text-white"
              to={`/place/${placeId}?details=services`}
            >
              Book again
            </Link>
          )}
        </div>
      </div>
      {dateObj && (
        <>
          <div className="my-4 flex-shrink-0 flex-grow-0 border-l"></div>
          <div className="flex w-20 flex-none flex-col items-center justify-center">
            <div className="text-sm font-semibold text-gray-800">
              {getMonthName(dateObj.getMonth())}
            </div>
            <div className="text-lg font-semibold text-black">
              {dateObj.getDate()}
            </div>
            <div className="text-sm font-semibold text-gray-800">
              {getTime(date!)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
