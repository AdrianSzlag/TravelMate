import { Children, useState } from "react";

import LoginForm from "./components/LoginForm";
import Modal from "./components/Modal";
import Backdrop from "./components/Backdrop";
import RegisterForm from "./components/RegisterForm";

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

export { LoginForm, RegisterForm, LoginModal };
