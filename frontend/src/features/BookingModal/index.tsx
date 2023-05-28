import { useAppSelector } from "hooks/redux-hooks";
import { createPortal } from "react-dom";

const Booking = () => {
  const onBackdropClickHandler = () => {};
  return (
    <div
      className="top-0 right-0 bottom-0 left-0 flex items-center justify-center 
                z-20 fixed bg-[#00000018]"
      onClick={onBackdropClickHandler}
    >
      <div className="bg-white p-4 shadow-xl border rounded">dsafa</div>
    </div>
  );
};

const BookingModal = () => {
  const isOpen = useAppSelector((state) => state.book.modalOpen);
  const modalRoot = document.getElementById("reservation-root") as HTMLElement;

  if (!isOpen) return null;
  return createPortal(<Booking />, modalRoot);
};

export default BookingModal;
