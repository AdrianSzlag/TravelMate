import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import isToday from "utils/isToday";
import { bookActions } from "store/book-slice";
import Option from "./Option";
import Arrow from "./Arrow";
import { useRef } from "react";
interface DayProps {
  day: number;
  dayName: string;
  isNow: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

const Day = ({
  day,
  dayName,
  isNow,
  isSelected,
  isDisabled,
  onClick,
}: DayProps) => {
  const textColor = isNow && !isSelected ? "!text-blue-600" : "";
  return (
    <Option
      onClick={onClick}
      isSelected={isSelected}
      isDisabled={isDisabled}
      className="w-16 h-20"
    >
      <span className={`${textColor} text-sm`}>{dayName}</span>
      <span className={`${textColor} mt-0.5`}>{day}</span>
    </Option>
  );
};

interface HourProps {
  hour: string;
  isNow: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

const Hour = ({ hour, isNow, isSelected, isDisabled, onClick }: HourProps) => {
  const textColor = isNow && !isSelected ? "!text-blue-600" : "";
  return (
    <Option
      onClick={onClick}
      isSelected={isSelected}
      isDisabled={isDisabled}
      className="w-16 h-8"
    >
      <span className={`${textColor} text-sm`}>{hour}</span>
    </Option>
  );
};

interface RowProps {
  children: React.ReactNode;
}

const Row = ({ children }: RowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const clickHandler = (direction: "left" | "right") => {
    if (!rowRef.current) return;
    const { scrollLeft, clientWidth } = rowRef.current;
    const scrollTo =
      direction === "left"
        ? scrollLeft - clientWidth / 2
        : scrollLeft + clientWidth / 2;
    rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  return (
    <div className="flex items-center mt-4">
      <Arrow
        direction="left"
        onClick={() => clickHandler("left")}
        className="flex-grow-0 flex-shrink-0"
      />
      <div className="flex gap-4 flex-1 overflow-hidden" ref={rowRef}>
        {children}
      </div>
      <Arrow
        direction="right"
        onClick={() => clickHandler("right")}
        className="flex-grow-0 flex-shrink-0"
      />
    </div>
  );
};

const Calendar = () => {
  const freeSlots = useAppSelector((state) => state.book.freeSlots);
  const selectedDate = useAppSelector((state) => state.book.selectedDate);
  const selectedTime = useAppSelector((state) => state.book.selectedTime);
  const dispatch = useAppDispatch();

  const slots = freeSlots.find((slot) => slot.date === selectedDate)?.slots;

  const getOnDateClickHandler = (date: string) => () =>
    dispatch(bookActions.setDate(date));

  const getDay = (date: string) => new Date(date).getDay();
  const getDayName = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { weekday: "short" });

  const getOnHourClickHandler = (hour: string) => () =>
    dispatch(bookActions.setTime(hour));

  return (
    <div className="mt-4 sm:w-[400px] md:w-[700px]">
      <h1 className="flex w-full justify-center text-2xl font-bold text-gray-800 ">
        2023
      </h1>
      <Row>
        {freeSlots.map((spot, i) => (
          <Day
            key={`${spot.date}`}
            day={getDay(spot.date)}
            dayName={getDayName(spot.date)}
            isNow={isToday(spot.date)}
            isSelected={selectedDate === spot.date}
            isDisabled={i === 1}
            onClick={getOnDateClickHandler(spot.date)}
          />
        ))}
      </Row>
      <div className="border-b w-full mt-4"></div>
      {slots && (
        <Row>
          {slots.map((slot) => (
            <Hour
              key={`${slot.start}`}
              hour={slot.start}
              isNow={false}
              isSelected={selectedTime === slot.start}
              isDisabled={false}
              onClick={getOnHourClickHandler(slot.start)}
            />
          ))}
        </Row>
      )}
    </div>
  );
};

export default Calendar;
