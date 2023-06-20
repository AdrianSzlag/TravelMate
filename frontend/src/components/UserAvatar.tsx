interface Props {
  name: string;
  url?: string;
  className?: string;
}

const UserAvatar = ({ name, url, className }: Props) => {
  const defaultClassName = "h-10 w-10 bg-pink-400";
  return (
    <div
      className={`${
        className ? className : defaultClassName
      } flex items-center justify-center rounded-full text-center text-lg font-bold text-white overflow-hidden`}
    >
      {!url && name.charAt(0)}
      {url && <img src={url} alt={name} className="w-full object-cover" />}
    </div>
  );
};

export default UserAvatar;
