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
      className="flex h-fit flex-col space-y-4 rounded-xl bg-white p-6 shadow-2xl xs:min-w-[320px]"
    >
      {children}
    </form>
  );
};

export default Form;
