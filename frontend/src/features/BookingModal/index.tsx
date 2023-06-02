import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { createPortal } from "react-dom";
import { bookActions } from "store/book-slice";
import Calendar from "./components/Calendar";
import ServiceOverview from "./components/ServiceOverview";
import { sendBookingRequest } from "store/book-actions";

const BookingForm = () => {
  const selectedDate = useAppSelector((state) => state.book.selectedDate);
  const selectedTime = useAppSelector((state) => state.book.selectedTime);
  const loading = useAppSelector((state) => state.book.loading);
  const message = useAppSelector((state) => state.book.message);
  const errorMessage = useAppSelector((state) => state.book.errorMessage);
  const formValid = !!selectedDate && !!selectedTime && !loading;

  const dispatch = useAppDispatch();
  const onBackdropClickHandler = () => {
    dispatch(bookActions.hideModal());
  };
  const onFormClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const onBookClickHandler = () => {
    if (!formValid) return;
    dispatch(sendBookingRequest());
  };

  const ErrorMessage = () => (
    <div className="mx-6 mt-4 text-red-500 font-semibold">{errorMessage}</div>
  );
  const Message = () => (
    <div className="mx-6 mt-4 text-green-500 font-semibold">{message}</div>
  );

  return (
    <div
      className="top-0 right-0 bottom-0 left-0 flex items-center justify-center 
                z-20 fixed bg-[#0000009a] box-border"
      onClick={onBackdropClickHandler}
    >
      <div
        className="bg-white shadow-xl border sm:rounded-xl sm:w-[550px] md:w-[700px] w-full"
        onClick={onFormClickHandler}
      >
        <Calendar />
        <ServiceOverview />
        <div className="border-b w-full mt-4"></div>
        {errorMessage && <ErrorMessage />}
        {message && <Message />}
        <div
          className={`${
            formValid
              ? "bg-blue-600 cursor-pointer"
              : "bg-blue-300 cursor-not-allowed"
          } mx-4 mt-4 text-white  box-border text-center py-2 rounded-lg `}
          onClick={onBookClickHandler}
        >
          {!loading ? "Book" : "Booking..."}
        </div>
        <div className="mt-4"></div>
      </div>
    </div>
  );
};

const BookingModal = () => {
  const isOpen = useAppSelector((state) => state.book.modalOpen);
  const modalRoot = document.getElementById("reservation-root") as HTMLElement;

  if (!isOpen) return null;
  return createPortal(<BookingForm />, modalRoot);
};

export default BookingModal;
