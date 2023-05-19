import { useAppSelector } from "../../../../../hooks/redux-hooks";

interface ServiceProps {
  name: string;
}
const Service = ({ name }: ServiceProps) => {
  return <div className="px-4 py-2 hover:bg-gray-100">{name}</div>;
};

const Services = () => {
  const services = useAppSelector((state) => state.places.focused?.services);

  if (!services || services.length === 0)
    return (
      <div className="w-full pt-4 text-center text-gray-400 ">
        No services yet.
      </div>
    );

  return (
    <div className="py-4">
      {services?.map((service) => (
        <Service key={service.name} name={service.name} />
      ))}
    </div>
  );
};

export default Services;
