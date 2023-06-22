import NavBar from "./components/NavBar";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { businessActions } from "store/business-slice";
import Dropdown, { DropdownButton } from "./components/Dropdown";

const Header = () => {
  const dispatch = useAppDispatch();
  const reservations = useAppSelector(
    (state) => state.reservations.reservations
  );
  const noOfReservations = reservations.length;
  const noOfNotifications = noOfReservations;

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
    <NavBar notifications={noOfNotifications}>
      {user && (
        <>
          <Button
            text="Reservations"
            onClick={onReservationsHandler}
            notifications={noOfReservations}
          />
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
              <DropdownButton text="Profile" />
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
      {!user && <Button text="Sign In" onClick={onSignInHandler} />}
    </NavBar>
  );
};

export default Header;
