import NavBar from "./components/NavBar";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "hooks/redux-hooks";

const Header = () => {
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
  return (
    <NavBar notifications={noOfNotifications}>
      {user && (
        <>
          <Button
            text="Reservations"
            onClick={onReservationsHandler}
            notifications={noOfReservations}
          />
          <Button text="Sign Out" onClick={onSignOutHandler} />
        </>
      )}
      {!user && <Button text="Sign In" onClick={onSignInHandler} />}
    </NavBar>
  );
};

export default Header;
