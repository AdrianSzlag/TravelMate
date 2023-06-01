import { useAppSelector } from "hooks/redux-hooks";

const ServiceOverview = () => {
  const selected = useAppSelector((state) => state.places.focused);
  return (
    <div className="m-6 p-4 rounded-lg bg-gray-200">
      <h1 className="text-2xl font-bold text-gray-800">{selected?.name}</h1>
    </div>
  );
};

export default ServiceOverview;
