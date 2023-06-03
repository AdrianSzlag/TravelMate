import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { createPortal } from "react-dom";
import { cancelSelectedReservation } from "store/reservations-actions";
import { reservationsActions } from "store/reservations-slice";

interface ModalProps {
  children: React.ReactNode;
}
const Modal = ({ children }: ModalProps) => {
  const modalRoot = document.getElementById("cancel-modal-root") as HTMLElement;
  return createPortal(children, modalRoot);
};

const ConfirmCancel = () => {
  const selectedReservation = useAppSelector(
    (state) => state.reservations.selected
  );
  const dispatch = useAppDispatch();
  if (!selectedReservation) return null;
  const closeModal = () => {
    dispatch(reservationsActions.setSelected(undefined));
  };
  const onFormClickHandler = (e: React.MouseEvent<HTMLDivElement>) =>
    e.stopPropagation();
  const onConfirmHandler = () => {
    dispatch(cancelSelectedReservation());
  };

  return (
    <Modal>
      <div
        className="top-0 right-0 bottom-0 left-0 flex items-center justify-center 
                z-20 fixed bg-[#0000009a] box-border "
        onClick={closeModal}
      >
        <div
          className="bg-white p-4 h-40 shadow-xl border rounded-xl sm:w-[550px] sm:border flex flex-col justify-between "
          onClick={onFormClickHandler}
        >
          <h1 className="font-semibold text-lg">
            Do you want to cancel reservation?
          </h1>
          <div className="flex flex-row justify-end">
            <button
              className="px-2 mb-1 py-1 bg-green-500 text-white rounded font-semibold text-sm border"
              onClick={closeModal}
            >
              Go Back
            </button>
            <button
              className="px-2 mb-1 py-1 bg-red-500 text-white ml-2 rounded font-semibold text-sm border"
              onClick={onConfirmHandler}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmCancel;
