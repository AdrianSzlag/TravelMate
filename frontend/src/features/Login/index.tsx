import { useState } from "react";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Modal from "./components/Modal";
import Backdrop from "./components/Backdrop";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const onSignUpHandler = () => {
    setIsLogin(false);
  };
  const onLoginHandler = () => {
    setIsLogin(true);
  };

  if (!isLogin) {
    return (
      <Modal>
        <Backdrop onClick={() => {}}>
          <RegisterForm onLogIn={onLoginHandler} />
        </Backdrop>
      </Modal>
    );
  }

  return (
    <Modal>
      <Backdrop onClick={() => {}}>
        <LoginForm onSignUp={onSignUpHandler} />
      </Backdrop>
    </Modal>
  );
};

export { Login };
