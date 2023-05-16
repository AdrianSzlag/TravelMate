import NavBar from "./components/NavBar";
import Button from "./components/Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const onSignOutHandler = () => {
    navigate("/logout");
  };
  return (
    <NavBar>
      <Button text="Sign Out" onClick={onSignOutHandler} />
    </NavBar>
  );
};

export default Header;
