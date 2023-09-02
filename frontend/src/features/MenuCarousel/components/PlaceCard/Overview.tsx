import { useAppSelector } from "hooks/redux-hooks";
import { RiMapPin2Line } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import Img from "components/Img";
import IOpeningHours from "types/IOpeningHours";
import { useCallback, useEffect, useRef, useState } from "react";
import { days } from "utils/dateTime";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import ImagePreview from "components/ImagePreview";

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

const Images = ({ images }: { images: string[] | null }) => {
  const isEmpty = !images || images.length === 0;
  const ref = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);

  const onScrollHandler = useCallback(() => {
    if (!ref.current) return;
    const scrollLeft = ref.current.scrollLeft;
    setScroll(scrollLeft);
  }, [ref.current]);

  useEffect(() => onScrollHandler(), [images, ref.current]);

  const scrollLeft = () => {
    if (!ref.current) return;
    const width = ref.current.offsetWidth;
    const scrollLeft = ref.current.scrollLeft;
    const scrollStep = width / 2;
    const scrollTarget = scrollLeft - scrollStep;
    ref.current.scrollTo({
      left: scrollTarget > 0 ? scrollTarget : 0,
      behavior: "smooth",
    });
  };
  const scrollRight = () => {
    if (!ref.current) return;
    const width = ref.current.offsetWidth;
    const scrollLeft = ref.current.scrollLeft;
    const scrollStep = width / 2;
    const scrollTarget = scrollLeft + scrollStep;
    ref.current.scrollTo({
      left: scrollTarget,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(onScrollHandler);
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [ref.current, onScrollHandler]);

  const isLeftArrow = scroll > 10;
  const isRightArrow =
    ref.current &&
    scroll < ref.current.scrollWidth - ref.current.offsetWidth - 10;

  return (
    <>
      <div
        className={"relative flex w-full items-center " + (isEmpty && "h-0")}
      >
        {isLeftArrow && (
          <div
            className="absolute left-0 z-10 flex h-full min-h-0 cursor-pointer items-center overflow-hidden"
            onClick={scrollLeft}
          >
            <BsArrowLeftCircleFill className="h-8 w-8 drop-shadow-[0_0_5px_rgba(255,255,255,100)]" />
          </div>
        )}
        <div
          className="no-scrollbar flex h-fit items-center gap-2 overflow-x-auto py-2"
          ref={ref}
          onScroll={onScrollHandler}
        >
          {!isEmpty &&
            images.map((image) => {
              return (
                <Img
                  key={image}
                  src={`/${image}`}
                  className="h-40 w-24 flex-none cursor-pointer rounded-xl object-cover hover:scale-105"
                  onClick={() => setImagePreviewOpen(true)}
                />
              );
            })}
        </div>
        {isRightArrow && (
          <div
            className="absolute right-0 z-10 flex h-full min-h-0 cursor-pointer items-center overflow-hidden"
            onClick={scrollRight}
          >
            <BsArrowRightCircleFill className="h-8 w-8 drop-shadow-[0_0_5px_rgba(255,255,255,100)]" />
          </div>
        )}
      </div>
      {imagePreviewOpen && images && (
        <ImagePreview
          images={images}
          onExit={() => setImagePreviewOpen(false)}
        />
      )}
    </>
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
      <Images images={images} />
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
            <span className="text-sm font-semibold text-gray-300" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Overview;
