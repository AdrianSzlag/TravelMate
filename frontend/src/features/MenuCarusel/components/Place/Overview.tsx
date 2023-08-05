import { useAppSelector } from "hooks/redux-hooks";
import { RiMapPin2Line } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import Img from "components/Img";
import IOpeningHours from "types/IOpeningHours";
import { useState } from "react";
import { days } from "utils/dateTime";

const HoursOverview = ({ openingHours }: { openingHours: IOpeningHours[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClickHandler = () => {
    setIsOpen((prev) => !prev);
  };
  const date = new Date();
  const dayOfWeek = date.getDay();
  const time = `${date.getHours()}:${date.getMinutes()}`;
  const isOpenNow = openingHours.some(
    (hour) =>
      hour.dayOfWeek === dayOfWeek &&
      hour.from !== "--:--" &&
      hour.to !== "--:--" &&
      hour.from <= time &&
      hour.to >= time
  );
  const todayTime = openingHours.find(
    (hour) => hour.dayOfWeek === dayOfWeek && hour.from !== "--:--"
  );
  let nextDayOpen;
  if (todayTime && todayTime?.from > time) {
    nextDayOpen = todayTime;
  } else {
    for (let i = 1; i < 7; i++) {
      const nextDay = (dayOfWeek + i) % 7;
      const nextDayTime = openingHours.find(
        (hour) => hour.dayOfWeek === nextDay && hour.from !== "--:--"
      );
      if (nextDayTime) {
        nextDayOpen = nextDayTime;
        break;
      }
    }
  }
  return (
    <div
      className="flex cursor-pointer flex-col gap-2 py-2"
      onClick={onClickHandler}
    >
      <div className="flex items-center text-gray-500">
        <FaRegClock className="mr-4 inline-block text-xl text-blue-500" />
        {isOpenNow && (
          <span className="mr-2 font-semibold">
            <span className="mr-1 text-green-500">Open</span>
            {todayTime && <span>⋅ Closing: {todayTime.to}</span>}
          </span>
        )}
        {!isOpenNow && (
          <span className="mr-2 font-semibold">
            <span className="mr-1 text-red-500">Closed</span>
            {nextDayOpen && (
              <span className="">
                ⋅ Opening {days[nextDayOpen.dayOfWeek]} {nextDayOpen.from}
              </span>
            )}
          </span>
        )}
        {isOpen ? (
          <MdExpandLess className="inline-block text-xl" />
        ) : (
          <MdExpandMore className="inline-block text-xl" />
        )}
      </div>
      <div
        className={`${
          isOpen ? "" : "hidden"
        } flex flex-col gap-2 overflow-hidden text-sm
        font-semibold text-gray-500 transition-all`}
      >
        {openingHours.map((hour) => {
          return (
            <div
              className="flex cursor-pointer items-center"
              key={hour.dayOfWeek}
            >
              <FaRegClock className="mr-4 inline-block text-xl opacity-0" />
              <span className="w-1/4">{days[hour.dayOfWeek]}</span>
              {hour.from !== "--:--" && (
                <span className="ml-4">
                  {hour.from} - {hour.to}
                </span>
              )}
              {hour.from === "--:--" && <span className="ml-4">Closed</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Overview = () => {
  const place = useAppSelector((state) => state.places.focused);

  const address = place?.address;
  const images = place?.images && place.images.length > 0 ? place.images : null;
  const phone = place?.contactInfo.phone;
  const email = place?.contactInfo.email;
  const tags = place?.tags;
  const hours = place?.openingHours;

  return (
    <div className="py-2">
      {images && (
        <div className="flex gap-2 py-2">
          {images.map((image) => {
            return (
              <Img
                key={image}
                src={`/${image}`}
                className="h-40 w-24 cursor-pointer rounded-xl object-cover hover:scale-105"
              />
            );
          })}
        </div>
      )}
      {address && (
        <div className="flex cursor-pointer items-center py-2">
          <RiMapPin2Line className="mr-4 inline-block text-xl text-blue-500" />
          <a
            className="font-semibold text-gray-500"
            href={`http://maps.google.com/?q=${address}`}
            target="_blank"
          >
            {address}
          </a>
        </div>
      )}
      {hours && <HoursOverview openingHours={hours} />}
      {phone && (
        <div className="flex cursor-pointer items-center py-2">
          <FiPhone className="mr-4 inline-block text-xl text-blue-500" />
          <a className="font-semibold text-gray-500" href={`tel:${phone}`}>
            {phone}
          </a>
        </div>
      )}
      {email && (
        <div className="flex cursor-pointer items-center py-2">
          <AiOutlineMail className="mr-4 inline-block text-xl text-blue-500" />
          <span className="font-semibold text-gray-500">{email}</span>
        </div>
      )}
      {tags && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span className="text-sm font-semibold text-gray-300">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Overview;
