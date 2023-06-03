import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { useState } from "react";
import { getMonthName, getMonthNameShort, getTime } from "utils/dateTime";
import ConfirmCancel from "./ConfirmCancel";
import { reservationsActions } from "store/reservations-slice";

interface ItemProps {
  title: string;
  address?: string;
  name: string;
  image?: string;
  date?: string;
  onCancel: () => void;
}

const Item = ({ title, address, name, image, date, onCancel }: ItemProps) => {
  const dateObj = date ? new Date(date) : undefined;
  const onClickHandler = () => onCancel();
  return (
    <div className="m-2 rounded-lg shadow border box-border flex">
      <div className="flex-1 px-4 py-2">
        <h1 className="font-semibold text-lg text-gray-800">{title}</h1>
        {address && (
          <h6 className="font-semibold text-sm text-gray-400">{address}</h6>
        )}
        <div className="flex flex-row items-center mt-2">
          {image && (
            <img src={image} alt={name} className="w-5 h-5 rounded-full mr-2" />
          )}
          <h3 className="font-semibold text-gray-600">{name}</h3>
        </div>
        <button
          className="px-2 mb-1 py-0.5 bg-red-500 text-white rounded mt-2 font-semibold text-sm"
          onClick={onClickHandler}
        >
          Cancel
        </button>
      </div>
      {dateObj && (
        <>
          <div className="border-l flex-grow-0 flex-shrink-0 my-4"></div>
          <div className="flex-none w-20 flex flex-col justify-center items-center">
            <div className="text-gray-600 text-sm">
              {getMonthName(dateObj.getMonth())}
            </div>
            <div className="text-gray-800 font-semibold text-lg">
              {dateObj.getDate()}
            </div>
            <div className="text-gray-600 text-sm">{getTime(date!)}</div>
          </div>
        </>
      )}
    </div>
  );
};

const List = () => {
  const reservations = useAppSelector(
    (state) => state.reservations.reservations
  );
  const dispatch = useAppDispatch();

  const setSelectedReservation = (id: string) => {
    dispatch(reservationsActions.setSelected(id));
  };

  return (
    <>
      <div className="relative h-full w-full max-h-full flex-shrink-0 flex-grow-0 sm:w-[400px]">
        <div className="absolute top-0 left-0 bottom-0 right-0  overflow-auto ">
          {reservations.map((reservation) => (
            <Item
              key={reservation.id}
              title={reservation.service.name}
              address={reservation.place.address}
              name={reservation.place.name}
              image={reservation.place.image}
              date={reservation.date}
              onCancel={() => setSelectedReservation(reservation.id)}
            />
          ))}
        </div>
      </div>
      <ConfirmCancel />
    </>
  );
};

export default List;
