import Header from "features/Header";
import Map from "features/Map";
import { useAppSelector } from "hooks/redux-hooks";
import { useAppNavigate } from "hooks/use-navigate";
import { useEffect } from "react";
import { List } from "features/Reservations";

const Reservations = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLogged);
  const navigate = useAppNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn]);

  return (
    <div className="fixed left-0 right-0 bottom-0 top-0 flex flex-col">
      <Header />
      <div className="relative flex flex-1 flex-col-reverse xs:flex-row">
        <Map />
        <List />
      </div>
    </div>
  );
};

export default Reservations;
