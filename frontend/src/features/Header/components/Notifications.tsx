interface Props {
  number: number;
}

const Notifications = ({ number }: Props) => {
  return (
    <span className="absolute top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-sm font-semibold text-white">
      {number}
    </span>
  );
};

export default Notifications;
