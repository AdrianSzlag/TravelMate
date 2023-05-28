import { useAppSelector } from "hooks/redux-hooks";

interface ServiceProps {
  name: string;
  price?: number;
  description?: string;
  image?: string;
}
const Service = ({ name, price, description, image }: ServiceProps) => {
  return (
    <div className="p-1 flex hover:bg-gray-100 cursor-pointer">
      <div className="flex-1">
        <div className="text-gray-700 text font-semibold">{name}</div>
        {price && <div className="text-gray-500 text-sm">{price} zl</div>}
        {description && (
          <div className="text-gray-400 text-sm">{description}</div>
        )}
      </div>
      {image && (
        <div className="w-20 h-20 bg-gray-300">
          <img src={image} alt={name} className="w-full h-full" />
        </div>
      )}
    </div>
  );
};

const Services = () => {
  const services = useAppSelector((state) => state.places.focused?.services);

  return (
    <div className="py-4">
      {services?.map((service) => (
        <Service
          key={service.name}
          name={service.name}
          price={service.price}
          description={service.description}
        />
      ))}
    </div>
  );
};

export default Services;
