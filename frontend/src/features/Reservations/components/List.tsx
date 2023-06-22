import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { useState } from "react";
import { getMonthName, getMonthNameShort, getTime } from "utils/dateTime";
import ConfirmCancel from "./ConfirmCancel";
import { reservationsActions } from "store/reservations-slice";
import { Link } from "react-router-dom";
import { IReservation } from "types/IReservation";
import { cancelReservation } from "store/reservations-actions";
import Img from "components/Img";

interface ItemProps {
  id: string;
  title: string;
  address?: string;
  name: string;
  image?: string;
  date?: string;
  selected: boolean;
  onClick: () => void;
  onCancel: () => void;
  bookAgain?: boolean;
}

const Item = ({
  id,
  title,
  address,
  name,
  image,
  date,
  onClick,
  onCancel,
  bookAgain = false,
}: ItemProps) => {
  const dateObj = date ? new Date(date) : undefined;
  const isDone = dateObj ? dateObj.getTime() < Date.now() : false;
  const onCancelClickHandler = () => onCancel();
  return (
    <div
      className="m-2 box-border flex rounded-lg border shadow"
      onClick={onClick}
    >
      <div className="flex-1 px-4 py-2">
        {isDone && (
          <div className="inline-block rounded-3xl bg-gray-200 px-2 text-sm font-semibold text-gray-600">
            Ended
          </div>
        )}
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        {address && (
          <h6 className="text-sm font-semibold text-gray-400">{address}</h6>
        )}
        <div className="mt-2 flex flex-row items-center">
          {image && (
            <Img
              src={"/" + image}
              alt={name}
              className="mr-2 h-5 w-5 rounded-full"
            />
          )}
          <h3 className="font-semibold text-gray-600">{name}</h3>
        </div>
        <div className="mb-1 mt-2 flex">
          {!isDone && (
            <button
              className="rounded bg-red-500 px-2 py-0.5 text-sm font-semibold text-white"
              onClick={onCancelClickHandler}
            >
              Cancel
            </button>
          )}
          {isDone && bookAgain && (
            <Link
              className="rounded bg-blue-500 px-2 py-0.5 text-sm font-semibold text-white"
              to={`/place/${id}?details=services`}
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
            <div className="text-sm text-gray-600">
              {getMonthName(dateObj.getMonth())}
            </div>
            <div className="text-lg font-semibold text-gray-800">
              {dateObj.getDate()}
            </div>
            <div className="text-sm text-gray-600">{getTime(date!)}</div>
          </div>
        </>
      )}
    </div>
  );
};

const List = () => {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const reservations = useAppSelector(
    (state) => state.reservations.reservations
  );
  const selectedReservation = useAppSelector(
    (state) => state.reservations.selected
  );
  const dispatch = useAppDispatch();
  const setSelectedReservation = (id: string) => {
    dispatch(reservationsActions.setSelected(id));
  };
  const cancelReservationHandler = (reservation: IReservation) => {
    dispatch(reservationsActions.openCancelModal(reservation));
  };
  const sortedReservations = [...reservations].sort(
    (a: IReservation, b: IReservation) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate.getTime() - bDate.getTime();
    }
  );
  const businesses = sortedReservations.reduce((acc, curr) => {
    const business = acc.find((b) => b.id === curr.place.id);
    if (!business && curr.user) {
      acc.push({
        id: curr.place.id,
        name: curr.place.name,
        address: curr.place.address,
      });
    }
    return acc;
  }, [] as { id: string; name: string; address?: string }[]);

  return (
    <>
      <div className="relative h-full max-h-full w-full flex-shrink-0 flex-grow-0 sm:w-[400px]">
        <div className="absolute top-0 left-0 bottom-0 right-0  overflow-auto bg-[#fcfcfc]">
          {reservations.length === 0 && (
            <h1 className="m-4 text-lg font-semibold text-gray-600">
              No reservations yet{" "}
              <Link to="/" className="text-blue-600">
                Book something now {":)"}
              </Link>
            </h1>
          )}
          {reservations.length > 0 && (
            <h1 className="m-4 font-bold text-gray-800">Your reservations:</h1>
          )}
          {sortedReservations
            .filter(
              (reservation) =>
                !reservation.user || reservation.user.id === userId
            )
            .map((reservation) => (
              <Item
                id={reservation.place.id}
                key={reservation.id}
                title={reservation.service.name}
                address={reservation.place.address}
                name={reservation.place.name}
                selected={reservation.id === selectedReservation?.id}
                image={reservation.place.image}
                date={reservation.date}
                onClick={() => setSelectedReservation(reservation.id)}
                onCancel={() => cancelReservationHandler(reservation)}
                bookAgain={true}
              />
            ))}
          {businesses && businesses.length > 0 && (
            <>
              <h1 className="m-4 font-bold text-gray-800">
                Reservations in your businesses:
              </h1>
              {businesses.map((business) => {
                return (
                  <div key={business.id}>
                    <div className="mx-4 mb-4 flex items-baseline ">
                      <h1 className="mr-2 text-lg font-semibold text-gray-600">
                        {business.name}
                      </h1>
                      <div className=" text-sm text-gray-400">
                        {business.address}
                      </div>
                    </div>
                    {sortedReservations
                      .filter(
                        (reservation) =>
                          reservation.user &&
                          reservation.place.id === business.id
                      )
                      .map((reservation) => (
                        <Item
                          id={reservation.id}
                          key={reservation.id}
                          title={reservation.service.name}
                          name={reservation.user!.name}
                          selected={reservation.id === selectedReservation?.id}
                          image={reservation.user!.profileImage}
                          date={reservation.date}
                          onClick={() => setSelectedReservation(reservation.id)}
                          onCancel={() => cancelReservationHandler(reservation)}
                        />
                      ))}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <ConfirmCancel />
    </>
  );
};

export default List;
