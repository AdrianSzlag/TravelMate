import NavBar from "./components/NavBar";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { businessActions } from "store/business-slice";

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
          <Button text="Create Business" onClick={onOpenBusinessModalHandler} />
          <Button text="Sign Out" onClick={onSignOutHandler} />
        </>
      )}
      {!user && <Button text="Sign In" onClick={onSignInHandler} />}
    </NavBar>
  );
};

export default Header;
