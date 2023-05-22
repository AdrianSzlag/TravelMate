import { LoginForm } from "../features/Login";
import { useNavigate, redirect } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  const onSuccesHandler = () => {
    navigate("/");
  };

  const onSignUpHandler = () => {
    navigate("/register");
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center">
      <LoginForm onSignUp={onSignUpHandler} onSuccess={onSuccesHandler} />
    </div>
  );
};

export default Login;

export function loader({ request }: { request: Request }) {
  if (isLoggedIn()) {
    return redirect("/");
  }
  return null;
}
