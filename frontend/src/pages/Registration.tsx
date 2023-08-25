import { NavBar } from "features/Header";
import { RegisterForm } from "features/Login";
import { redirect, useNavigate } from "react-router-dom";
import { isLoggedIn } from "utils/auth";

const Register = () => {
  const navigate = useNavigate();

  const onSuccessHandler = () => {
    navigate("/search");
  };

  const onLoginHandler = () => {
    navigate("/login");
  };

  return (
    <>
      <NavBar />
      <div className="m-auto px-4 xs:h-fit xs:w-fit xs:min-w-[320px] xs:px-0">
        <h1 className="pb-4 pt-6 text-2xl font-bold leading-tight tracking-tight text-gray-800 xs:pt-10 xs:pb-8">
          Create Your Account
        </h1>
        <RegisterForm onLogIn={onLoginHandler} onSuccess={onSuccessHandler} />
      </div>
    </>
  );
};

export default Register;

export function loader({ request }: { request: Request }) {
  if (isLoggedIn()) {
    return redirect("/search");
  }
  return null;
}
