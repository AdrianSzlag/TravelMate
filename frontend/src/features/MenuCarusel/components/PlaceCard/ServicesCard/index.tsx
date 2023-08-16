import Img from "components/Img";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { useState } from "react";
import { showBookingModal } from "store/book-actions";
import NewServiceModal from "./NewServiceModal";
import { deleteService, fetchPlace } from "store/places-actions";

interface ServiceProps {
  placeId: string;
  serviceId: string;
  name: string;
  price?: number;
  description?: string;
  image?: string;
  edit: boolean;
  onDelete: () => void;
}
const Service = ({
  placeId,
  serviceId,
  name,
  price,
  description,
  image,
  edit,
  onDelete,
}: ServiceProps) => {
  const dispatch = useAppDispatch();
  const onClickHandler = () => {
    dispatch(showBookingModal(placeId, serviceId));
  };
  return (
    <div className="p-1 ">
      <div className="flex">
        <div className="flex-1">
          <div className="text font-semibold text-gray-700">{name}</div>
          <div className="flex items-center">
            {!!price && (
              <div className="mr-2 w-10 text-sm text-gray-500">{price} zl</div>
            )}
            <button
              className="my-0.5 rounded bg-blue-600 px-2 text-sm font-semibold text-white"
              onClick={onClickHandler}
            >
              Book
            </button>
          </div>
          {description && (
            <div className="text-sm text-gray-400">{description}</div>
          )}
          {edit && (
            <div
              className="flex cursor-pointer text-sm font-semibold text-blue-600"
              onClick={onDelete}
            >
              Delete service
            </div>
          )}
        </div>
        {image && (
          <div className="h-20 w-24 ">
            <Img
              src={`/${image}`}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Services = () => {
  const [newServiceModalOpen, setNewServiceModalOpen] = useState(false);
  const services = useAppSelector((state) => state.places.focused?.services);
  const placeId = useAppSelector((state) => state.places.focused?.id);
  const ownerId = useAppSelector((state) => state.places.focused?.createdBy.id);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const isOwner = user?.id === ownerId;

  const deleteServiceHandler = async (id: string) => {
    if (!placeId || !isOwner) return;
    const confirm = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (confirm) {
      dispatch(deleteService(placeId, id));
    }
  };

  const onCloseModalHandler = () => {
    dispatch(fetchPlace(placeId!));
    setNewServiceModalOpen(false);
  };

  return (
    <div className="py-4">
      {services?.length === 0 && (
        <div className="pl-1 font-semibold text-gray-400">
          No services available!
        </div>
      )}
      {isOwner && (
        <button
          className="rounded pl-1 text-sm font-semibold text-gray-400 hover:underline"
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
          edit={isOwner}
          onDelete={() => deleteServiceHandler(service.id)}
        />
      ))}
      {newServiceModalOpen && (
        <NewServiceModal placeId={placeId!} onClose={onCloseModalHandler} />
      )}
    </div>
  );
};

export default Services;
