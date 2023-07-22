import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { bookActions } from "store/book-slice";
import Calendar from "./components/Calendar";
import ServiceOverview from "./components/ServiceOverview";
import { sendBookingRequest } from "store/book-actions";
import Modal from "components/Modal";

const BookingModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.book.modalOpen);
  const selectedDate = useAppSelector((state) => state.book.selectedDate);
  const selectedTime = useAppSelector((state) => state.book.selectedTime);
  const loading = useAppSelector((state) => state.book.loading);
  const message = useAppSelector((state) => state.book.message);
  const errorMessage = useAppSelector((state) => state.book.errorMessage);

  if (!isOpen) return null;
  const formValid = !!selectedDate && !!selectedTime && !loading;

  const onBackdropClickHandler = () => {
    dispatch(bookActions.hideModal());
  };
  const onBookClickHandler = () => {
    if (!formValid) return;
    dispatch(sendBookingRequest());
  };
  const ErrorMessage = () => (
    <div className="mx-6 mt-4 font-semibold text-red-500">{errorMessage}</div>
  );
  const Message = () => (
    <div className="mx-6 mt-4 font-semibold text-green-500">{message}</div>
  );

  return (
    <Modal
      onBackdropClick={onBackdropClickHandler}
      className="w-full border bg-white shadow-xl sm:w-[550px] sm:rounded-xl md:w-[700px]"
    >
      <Calendar />
      <ServiceOverview />
      <div className="mt-4 w-full border-b"></div>
      {errorMessage && <ErrorMessage />}
      {message && <Message />}
      <div
        className={`${
          formValid
            ? "cursor-pointer bg-blue-600"
            : "cursor-not-allowed bg-blue-300"
        } mx-4 mt-4 box-border  rounded-lg py-2 text-center text-white `}
        onClick={onBookClickHandler}
      >
        {!loading ? "Book" : "Booking..."}
      </div>
      <div className="mt-4"></div>
    </Modal>
  );
};

export default BookingModal;
