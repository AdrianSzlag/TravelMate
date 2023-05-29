import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { showBookingModal } from "store/book-actions";

interface ServiceProps {
  placeId: string;
  serviceId: string;
  name: string;
  price?: number;
  description?: string;
  image?: string;
}
const Service = ({
  placeId,
  serviceId,
  name,
  price,
  description,
  image,
}: ServiceProps) => {
  const dispatch = useAppDispatch();
  const onClickHandler = () => {
    dispatch(showBookingModal(placeId, serviceId));
  };
  return (
    <div className="p-1 flex ">
      <div className="flex-1">
        <div className="text-gray-700 text font-semibold">{name}</div>
        <div className="flex items-center">
          {price && (
            <div className="text-gray-500 text-sm mr-2">{price} zl</div>
          )}
          <div
            className="bg-blue-600 text-white cursor-pointer px-2 rounded-3xl text-sm font-semibold"
            onClick={onClickHandler}
          >
            Book
          </div>
        </div>
        {description && (
          <div className="text-gray-400 text-sm">{description}</div>
        )}
      </div>
      {image && (
        <div className="w-24 h-20 p-1 ">
          <img
            src={`/${image}`}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

const Services = () => {
  const services = useAppSelector((state) => state.places.focused?.services);
  const placeId = useAppSelector((state) => state.places.focused?.id);

  return (
    <div className="py-4">
      {services?.map((service) => (
        <Service
          key={service.name}
          placeId={placeId!}
          serviceId={service.id}
          name={service.name}
          price={service.price}
          description={service.description}
          image={service.image}
        />
      ))}
    </div>
  );
};

export default Services;
