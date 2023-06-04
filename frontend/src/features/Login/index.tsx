import { Children, useState } from "react";

import LoginForm from "./components/LoginForm";
import Modal from "./components/Modal";
import Backdrop from "./components/Backdrop";
import RegisterForm from "./components/RegisterForm";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { authActions } from "store/auth-slice";

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
  const stopPropagation = (e: any) => e.stopPropagation();
  return (
    <Modal>
      <Backdrop onClick={onExit}>
        <div onClick={stopPropagation}>
          {isLogin ? (
            <LoginForm onSignUp={onToggle} onSuccess={onSuccessfulLogin} />
          ) : (
            <RegisterForm
              onLogIn={onToggle}
              onSuccess={() => setIsLogin(true)}
            />
          )}
        </div>
      </Backdrop>
    </Modal>
  );
};

export { LoginForm, RegisterForm, LoginModal };
