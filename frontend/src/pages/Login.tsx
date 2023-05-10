import { Login as LoginForm } from "../features/Login";
import { redirect, useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center">
      <LoginForm onSuccess={() => navigate("/")} />
    </div>
  );
};

export default Login;

export function loader() {
  const token = getToken();
  if (token) {
    return redirect("/");
  }
  return null;
}
