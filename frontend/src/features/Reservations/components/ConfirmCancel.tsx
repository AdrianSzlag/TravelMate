import Modal from "components/Modal";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { createPortal } from "react-dom";
import { cancelReservation } from "store/reservations-actions";
import { reservationsActions } from "store/reservations-slice";

const ConfirmCancel = () => {
  const selectedReservation = useAppSelector(
    (state) => state.reservations.selected
  );
  const confirmCancelModalOpen = useAppSelector(
    (state) => state.reservations.cancelModalOpen
  );
  const dispatch = useAppDispatch();
  if (!selectedReservation) return null;
  const closeModal = () => {
    dispatch(reservationsActions.closeCancelModal());
  };

  if (!confirmCancelModalOpen) return null;

  const onConfirmHandler = () => {
    dispatch(cancelReservation(selectedReservation.id));
  };

  return (
    <Modal
      onBackdropClick={closeModal}
      className="flex h-40 flex-col justify-between rounded-xl border bg-white p-4 shadow-xl sm:w-[550px] sm:border"
    >
      <h1 className="text-lg font-semibold">
        Do you want to cancel reservation?
      </h1>
      <div className="flex flex-row justify-end">
        <button
          className="mb-1 rounded border bg-green-500 px-2 py-1 text-sm font-semibold text-white"
          onClick={closeModal}
        >
          Go Back
        </button>
        <button
          className="mb-1 ml-2 rounded border bg-red-500 px-2 py-1 text-sm font-semibold text-white"
          onClick={onConfirmHandler}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmCancel;
