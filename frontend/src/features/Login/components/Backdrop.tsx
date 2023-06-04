interface BackdropProps {
  onClick: () => void;
  children: React.ReactNode;
}
const Backdrop = ({ onClick, children }: BackdropProps) => {
  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center bg-[#0000002a] bg-opacity-50"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Backdrop;
