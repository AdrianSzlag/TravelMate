interface Props {
  text: string;
  disabled?: boolean;
}

const Button = ({ text, disabled }: Props) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${
        disabled
          ? "cursor-not-allowed bg-[#7197fe] hover:bg-[#7197fe] focus:ring-[#fd9393]"
          : "bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-[#93c5fd]"
      } w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium
       text-white hover:bg-[#1d4ed8] focus:outline-none focus:ring-4`}
    >
      {text}
    </button>
  );
};

export default Button;
