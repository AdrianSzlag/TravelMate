import NavBar from "./components/NavBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { businessActions } from "store/business-slice";
import Dropdown, { DropdownButton } from "./components/Dropdown";
import { createPortal } from "react-dom";
import { ReactNode, useState } from "react";
import Profile from "./components/Profile";
import SignInButton from "./components/SignInButton";
import Notifications from "./components/Notifications";
import { BiBookContent } from "react-icons/bi";
import { DateTime } from "luxon";

const ProfileModal = ({ children }: { children: ReactNode }) => {
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return createPortal(children, modalRoot);
};

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const reservations = useAppSelector(
    (state) => state.reservations.reservations
  );
  const noOfNotifications = reservations.reduce((acc, curr) => {
    const isDone =
      DateTime.fromISO(curr.date).plus({ minutes: curr.duration }) <
      DateTime.now();
    if (!isDone) acc++;
    return acc;
  }, 0);

  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const onSignOutHandler = () => {
    navigate("/logout");
  };
  const onSignInHandler = () => {
    navigate("/login");
  };
  const onReservationsHandler = () => {
    navigate("/reservations");
  };
  const onOpenBusinessModalHandler = () => {
    navigate("/");
    dispatch(businessActions.showModal());
  };

  return (
    <NavBar>
      {user && (
        <>
          <li
            className="relative h-fit cursor-pointer"
            onClick={onReservationsHandler}
          >
            {noOfNotifications > 0 && (
              <Notifications number={noOfNotifications} />
            )}
            <div className="hidden px-2 py-1 font-semibold text-white xs:block">
              Reservations
            </div>
            <BiBookContent className="mx-2 my-1 h-6 w-6 text-white xs:hidden" />
          </li>
          <Dropdown>
            <div className="px-4 py-3 text-sm  text-gray-900 ">
              <div className="font-semibold">{user.name}</div>
              <div className="truncate">{user.email}</div>
            </div>
            <ul className="py-2 ">
              <DropdownButton
                text="Reservations"
                onClick={onReservationsHandler}
              />
              <DropdownButton
                text="Profile"
                onClick={() => setShowModal(true)}
              />
              <DropdownButton
                text="Create business"
                onClick={onOpenBusinessModalHandler}
              />
            </ul>
            <ul className="py-2 ">
              <DropdownButton text="Sign out" onClick={onSignOutHandler} />
            </ul>
          </Dropdown>
        </>
      )}
      {!user && <SignInButton onClick={onSignInHandler} />}
      {user && showModal && (
        <ProfileModal>
          <Profile onClose={() => setShowModal(false)} />
        </ProfileModal>
      )}
    </NavBar>
  );
};

export default Header;
export { NavBar };
