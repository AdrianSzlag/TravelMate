import { RegisterForm } from "../features/Login";
import { redirect, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();

  const onSuccesHandler = () => {
    navigate("/");
  };

  const onLoginHandler = () => {
    navigate("/login");
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center">
      <RegisterForm onLogIn={onLoginHandler} onSuccess={onSuccesHandler} />
    </div>
  );
};

export default Register;

export function loader({ request }: { request: Request }) {
  if (isLoggedIn()) {
    return redirect("/");
  }
  return null;
}
