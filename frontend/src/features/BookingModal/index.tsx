import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { createPortal } from "react-dom";
import { bookActions } from "store/book-slice";
import Calendar from "./components/Calendar";

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
                z-20 fixed bg-[#0000009a]"
      onClick={onBackdropClickHandler}
    >
      <div
        className="bg-white shadow-xl border rounded-xl"
        onClick={onFormClickHandler}
      >
        <Calendar />
        <div className="border-b w-full mt-4"></div>
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
