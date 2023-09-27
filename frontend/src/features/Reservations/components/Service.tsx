import { useAppDispatch } from "hooks/redux-hooks";
import { getMonthName, getTime } from "utils/dateTime";
import { Link } from "react-router-dom";
import Img from "components/Img";
import { showServiceEditingModal } from "store/service-actions";
import { DateTime } from "luxon";
import Button from "components/Button";

interface Props {
  id: string;
  serviceId: string;
  placeId: string;
  title: string;
  address?: string;
  name: string;
  image?: string;
  date: string;
  duration: number;
  selected: boolean;
  onClick: () => void;
  onCancel: () => void;
  bookAgain?: boolean;
}
const Service = ({
  id,
  placeId,
  serviceId,
  title,
  address,
  name,
  image,
  date,
  duration,
  onClick,
  onCancel,
  bookAgain = false,
}: Props) => {
  const dispatch = useAppDispatch();
  const startDate = DateTime.fromISO(date);
  const started = startDate < DateTime.now();
  const isDone = startDate.plus({ minutes: duration }) < DateTime.now();
  const onCancelClickHandler = () => onCancel();
  const openEditModal = () => {
    dispatch(showServiceEditingModal(id, placeId, serviceId, date));
  };
  const order = isDone
    ? "3" + (100000000 - startDate.toMillis() / 60000)
    : (started ? "1" : "2") + startDate.toMillis() / 60000;

  return (
    <div
      className="box-border flex rounded border"
      onClick={onClick}
      style={{ order: order }}
    >
      <div className="flex flex-1 flex-col gap-2 p-4">
        {isDone && (
          <div className="inline-block w-fit rounded bg-gray-200 px-2 py-0.5 text-sm font-semibold ">
            Ended
          </div>
        )}
        {started && !isDone && (
          <div className="inline-block w-fit rounded bg-orange-500 px-2 py-0.5 text-sm font-semibold text-white">
            Now
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
          {!started && (
            <>
              <Button
                text="Cancel"
                onClick={onCancelClickHandler}
                className="bg-red-500 text-white"
              />
              <Button
                text="Edit"
                onClick={openEditModal}
                className="bg-gray-500 text-white"
              />
            </>
          )}
          {isDone && bookAgain && (
            <Link to={`/place/${placeId}?details=services`}>
              <Button text="Book again" className="bg-blue-500 text-white" />
            </Link>
          )}
          {isDone && (
            <Button
              text="Remove"
              onClick={onCancelClickHandler}
              className="bg-gray-500 text-white"
            />
          )}
        </div>
      </div>
      {startDate && (
        <>
          <div className="my-4 flex-shrink-0 flex-grow-0 border-l"></div>
          <div className="flex w-24 flex-none flex-col items-center justify-center">
            <div className="text-sm font-semibold text-gray-800">
              {getMonthName(startDate.month)}
            </div>
            <div className="text-lg font-semibold text-black">
              {startDate.day}
            </div>
            <div className="text-sm font-semibold text-gray-800">
              {startDate.hour.toString().padStart(2, "0")}:
              {startDate.minute.toString().padStart(2, "0")}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Service;
