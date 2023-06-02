interface Props {
  onClick: () => void;
  text: string;
  notifications?: number;
}

const Button = ({ onClick, text, notifications }: Props) => {
  const number = notifications ? notifications : 0;
  return (
    <li className="mt-2 cursor-pointer md:mt-0 relative" onClick={onClick}>
      {number > 0 && (
        <span className="flex top-0 -right-1 justify-center items-center absolute rounded-full w-4 h-4 bg-green-600 text-white font-semibold text-sm">
          {number}
        </span>
      )}
      <div className="px-2 py-1 font-semibold text-white">{text}</div>
    </li>
  );
};

export default Button;
