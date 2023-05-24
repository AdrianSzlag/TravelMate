import { useEffect, useState } from "react";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import useApi from "hooks/use-api";
import { setAuthData } from "utils/auth";
import { IUser } from "types/IUser";

interface Props {
  onSignUp: () => void;
  onSuccess: () => void;
}

interface TokenResponse {
  token: string;
  user: IUser;
}

const LoginForm = ({ onSignUp, onSuccess }: Props) => {
  const { data, loading, error, fetch } = useApi<TokenResponse>("/api/login", {
    method: "POST",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validEmail = email.includes("@");
  const validPassword = password.length >= 6;

  const formValid = validEmail && validPassword && !loading;

  const onSubmitHandler = () => {
    if (!formValid) return;
    fetch({
      email,
      password,
    });
  };

  useEffect(() => {
    if (data) {
      setAuthData(data.token, data.user);
      onSuccess();
    }
  }, [data]);

  return (
    <Form onSubmit={onSubmitHandler}>
      <h1 className=" text-xl font-bold leading-tight tracking-tight text-gray-900">
        Sign in to your account
      </h1>
      {error && (
        <h2 className="text-base font-bold leading-tight tracking-tight text-red-400">
          {error}
        </h2>
      )}
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
      <Button text={"Sign in"} disabled={!formValid} loading={loading} />
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
