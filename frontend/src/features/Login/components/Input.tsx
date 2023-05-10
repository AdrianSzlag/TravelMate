import { useState, useEffect } from "react";

interface Props {
  type: string;
  placeholder: string;
  value: string;
  title: string;
  onChange: (value: string) => void;
  isValid: boolean;
  name: string;
}

const Input = ({
  type,
  title,
  placeholder,
  value,
  onChange,
  isValid,
  name,
}: Props) => {
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState(false);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    setError(false);
  };

  const onBlurHandler = () => {
    setIsTouched(true);
  };

  useEffect(() => {
    if (isTouched) {
      const timeout = setTimeout(() => {
        if (!isValid) {
          setError(true);
        }
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isTouched, isValid, value]);

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {title}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        name={name}
        className={` ${
          error ? "border-red-300" : "border-gray-300"
        } block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-[#2563eb] focus:ring-[#2563eb] sm:text-sm`}
      />
    </div>
  );
};

export default Input;