import { useEffect, useState } from "react";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import useApi from "../../../hooks/use-api";
import { setToken } from "../../../utils/auth";

interface Props {
  onLogIn: () => void;
  onSuccess: () => void;
}

interface RegisterResponse {
  message?: string;
}

const RegisterForm = ({ onLogIn, onSuccess }: Props) => {
  const { data, code, loading, error, fetch } = useApi<RegisterResponse>(
    "/api/register",
    {
      method: "POST",
    }
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validName = name.length > 0;
  const validEmail = email.includes("@");
  const validPassword = password.length >= 6;
  const validConfirmPassword = confirmPassword === password;

  const formValid =
    validEmail &&
    validPassword &&
    validConfirmPassword &&
    validName &&
    !loading;

  const onSubmitHandler = () => {
    if (!formValid) return;
    fetch({
      firstName: name,
      email,
      password,
      phone: "123456789",
      dateOfBirth: "1990-01-01",
    });
  };

  useEffect(() => {
    if (code === 201) {
      const timeout = setTimeout(() => {
        onSuccess();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [code]);

  return (
    <Form onSubmit={onSubmitHandler}>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
        Create Your Account
      </h1>
      {error && (
        <h2 className="text-base font-bold leading-tight tracking-tight text-red-400">
          {error}
        </h2>
      )}
      {data?.message && (
        <h2 className="text-base font-bold leading-tight tracking-tight text-green-400">
          {data.message}
        </h2>
      )}
      <Input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={setName}
        isValid={validName}
        title="Name"
        name="name"
        errorMessage="Please enter your name."
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={setEmail}
        isValid={validEmail}
        title="Email"
        name="email"
        errorMessage="Please enter a valid email address."
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
        isValid={validPassword}
        title="Password"
        name="password"
        errorMessage="Password must be at least 6 characters long."
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        isValid={validConfirmPassword}
        title="Confirm Password"
        name="confirm-password"
        errorMessage="Passwords must match."
      />
      <Button
        text={"Sign in"}
        disabled={!formValid || !!data?.message}
        loading={loading || !!data?.message}
      />
      <p className="text-sm font-light text-gray-500">
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
