import { useAppSelector } from "hooks/redux-hooks";
import { getTime } from "utils/dateTime";

const getEndTime = (time: string, duration: number) => {
  const endDateTime = new Date(`1970-01-01T${time}:00Z`);
  endDateTime.setMinutes(endDateTime.getMinutes() + duration);
  const dateString = endDateTime.toISOString();
  return getTime(dateString);
};

const ServiceOverview = () => {
  const selected = useAppSelector((state) => state.places.focused);
  const selectedServiceId = useAppSelector((state) => state.book.serviceId);
  const selectedService = selected?.services.find(
    (service) => service.id === selectedServiceId
  );
  const selectedTime = useAppSelector((state) => state.book.selectedTime);
  const duration = selectedService?.duration;

  const endTime =
    selectedTime && duration ? getEndTime(selectedTime, duration) : undefined;

  return (
    <div className="m-6 p-4 rounded-lg bg-gray-100">
      <div className="flex justify-between">
        <h1 className="text-lg font-bold text-gray-600">
          {selectedService?.name}
        </h1>
        <div className="font-semibold text-gray-500">
          {selectedService?.price} zl
        </div>
      </div>
      <div className="flex h-10 justify-end text-sm text-gray-400 font-semibold">
        {selectedTime && `${selectedTime}`}
        {endTime && ` - ${endTime}`}
      </div>
    </div>
  );
};

export default ServiceOverview;
