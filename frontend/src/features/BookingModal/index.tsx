import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { createPortal } from "react-dom";
import { bookActions } from "store/book-slice";
import Calendar from "./components/Calendar";
import ServiceOverview from "./components/ServiceOverview";

const BookingForm = () => {
  const dispatch = useAppDispatch();
  const onBackdropClickHandler = () => {
    dispatch(bookActions.hideModal());
  };
  const onFormClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

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
        <div className="mx-4 mt-4 text-white bg-blue-600 box-border text-center py-2 rounded-lg cursor-pointer">
          Book
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
