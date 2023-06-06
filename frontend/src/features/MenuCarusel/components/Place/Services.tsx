import Img from "components/Img";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { useState } from "react";
import { showBookingModal } from "store/book-actions";
import NewServiceModal from "./NewServiceModal";

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
          <button
            className="px-2 bg-blue-600 text-white rounded font-semibold my-0.5 text-sm"
            onClick={onClickHandler}
          >
            Book
          </button>
        </div>
        {description && (
          <div className="text-gray-400 text-sm">{description}</div>
        )}
      </div>
      {image && (
        <div className="w-24 h-20 p-1 ">
          <Img
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
  const [newServiceModalOpen, setNewServiceModalOpen] = useState(false);
  const services = useAppSelector((state) => state.places.focused?.services);
  const placeId = useAppSelector((state) => state.places.focused?.id);
  const ownerId = useAppSelector((state) => state.places.focused?.createdBy.id);
  const user = useAppSelector((state) => state.auth.user);
  const isOwner = user?.id === ownerId;

  return (
    <div className="py-4">
      {services?.length === 0 && (
        <div className="text-gray-400 font-semibold">
          No services available!
        </div>
      )}
      {isOwner && (
        <button
          className="rounded text-sm font-semibold text-gray-400 hover:underline"
          onClick={() => setNewServiceModalOpen(true)}
        >
          Click to add new service
        </button>
      )}
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
      {newServiceModalOpen && (
        <NewServiceModal
          placeId={placeId!}
          onClose={() => setNewServiceModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Services;
