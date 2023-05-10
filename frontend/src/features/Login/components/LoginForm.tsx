import { useState } from "react";
import Modal from "./Modal";
import Form from "./Form";
import Input from "./Input";
import Backdrop from "./Backdrop";
import Button from "./Button";

interface Props {
  onSignUp: () => void;
}

const LoginForm = ({ onSignUp }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validEmail = email.includes("@");
  const validPassword = password.length > 6;

  const onSubmitHandler = () => {
    console.log("elo");
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
        Sign in to your account
      </h1>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={setEmail}
        isValid={validEmail}
        title="Email"
        name="email"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
        isValid={validPassword}
        title="Password"
        name="password"
      />
      <Button text={"Sign in"} disabled={!validEmail || !validPassword} />
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <a
          className="text-primary-600 dark:text-primary-500 cursor-pointer font-medium hover:underline"
          onClick={onSignUp}
        >
          Sign up
        </a>
      </p>
    </Form>
  );
};

export default LoginForm;