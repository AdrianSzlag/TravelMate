import Logo from "components/Logo";

interface FormProps {
  children: React.ReactNode;
  onSubmit: () => void;
}

const Form = ({ children, onSubmit }: FormProps) => {
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex h-full w-full flex-col space-y-4 bg-white p-6 text-gray-600 shadow-2xl xs:h-fit xs:w-fit xs:min-w-[320px] xs:rounded-xl"
    >
      <div className="flex space-y-2">
        <Logo className="h-10 w-10" fill="#4b5563" />
      </div>
      {children}
    </form>
  );
};

export default Form;
