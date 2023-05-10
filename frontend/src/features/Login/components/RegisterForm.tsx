import { useState } from "react";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import useApi from "../../../hooks/use-api";

interface Props {
  onLogIn: () => void;
}

const RegisterForm = ({ onLogIn }: Props) => {
  const { data, loading, error, fetch } = useApi("/api/register", {
    method: "POST",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validName = name.length > 0;
  const validEmail = email.includes("@");
  const validPassword = password.length > 6;
  const validConfirmPassword = confirmPassword === password;

  const formValid =
    validEmail && validPassword && validConfirmPassword && validName;

  const onSubmitHandler = () => {
    if (!formValid) return;
    fetch({
      name,
      email,
      password,
    }).then((data) => {
      console.log(data);
    });
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
        Create Your Account
      </h1>
      <Input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={setName}
        isValid={validName}
        title="Name"
        name="name"
      />
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
      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        isValid={validConfirmPassword}
        title="Confirm Password"
        name="confirm-password"
      />
      <Button text={"Sign in"} disabled={!formValid} />
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Allready have an account?{" "}
        <a
          className="text-primary-600 dark:text-primary-500 cursor-pointer font-medium hover:underline"
          onClick={onLogIn}
        >
          Sign in
        </a>
      </p>
    </Form>
  );
};

export default RegisterForm;
