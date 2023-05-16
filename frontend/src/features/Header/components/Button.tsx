interface Props {
  onClick: () => void;
  text: string;
}

const Button = ({ onClick, text }: Props) => {
  return (
    <li className="mt-2 cursor-pointer md:mt-0" onClick={onClick}>
      <div className="px-2 py-1 text-lg text-white">{text}</div>
    </li>
  );
};

export default Button;
