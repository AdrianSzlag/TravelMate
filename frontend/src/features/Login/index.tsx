import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { authActions } from "store/auth-slice";
import Modal from "components/Modal";

const LoginModal = () => {
  const isOpen = useAppSelector((state) => state.auth.modalOpen);
  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  const onToggle = () => setIsLogin((login) => !login);
  const onSuccessfulLogin = () => {
    dispatch(authActions.hideModal());
  };
  const onExit = () => {
    dispatch(authActions.hideModal());
  };
  return (
    <Modal onBackdropClick={onExit}>
      {isLogin ? (
        <LoginForm onSignUp={onToggle} onSuccess={onSuccessfulLogin} />
      ) : (
        <RegisterForm onLogIn={onToggle} onSuccess={() => setIsLogin(true)} />
      )}
    </Modal>
  );
};

export { LoginForm, RegisterForm, LoginModal };
