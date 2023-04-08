interface Props {
  onClick: () => void;
}

const BackButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center rounded bg-gray-200 py-2 px-4 font-bold text-gray-800 hover:bg-gray-300"
    >
      Back
    </button>
  );
};

export default BackButton;
