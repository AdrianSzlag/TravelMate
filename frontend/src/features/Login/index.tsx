import { Children, useState } from "react";

import LoginForm from "./components/LoginForm";
import Modal from "./components/Modal";
import Backdrop from "./components/Backdrop";
import RegisterForm from "./components/RegisterForm";

interface LoginProps {
  onSuccess?: () => void;
}

const Login = ({ onSuccess }: LoginProps) => {
  const [isLogin, setIsLogin] = useState(true);

  const onSignUpHandler = () => {
    setIsLogin(false);
  };
  const onLoginHandler = () => {
    setIsLogin(true);
  };
  const onSuccessHandler = () => {
    onSuccess && onSuccess();
  };

  return (
    <>
      {isLogin ? (
        <LoginForm onSignUp={onSignUpHandler} onSuccess={onSuccessHandler} />
      ) : (
        <RegisterForm onLogIn={onLoginHandler} />
      )}
    </>
  );
};

interface ModalProps {
  onExit: () => void;
  children: React.ReactNode;
}

const LoginModal = ({ onExit, children }: ModalProps) => {
  return (
    <Modal>
      <Backdrop onClick={onExit}>{children}</Backdrop>
    </Modal>
  );
};

export { Login, LoginModal };
