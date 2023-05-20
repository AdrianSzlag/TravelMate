interface Props {
  userId: string;
}

const UserAvatar = ({ userId }: Props) => {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-400 text-center text-lg font-bold text-white">
      {userId.charAt(0)}
    </div>
  );
};

export default UserAvatar;
