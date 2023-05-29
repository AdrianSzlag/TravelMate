import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import Option from "./Option";
import isToday from "utils/isToday";
import { bookActions } from "store/book-slice";

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

const Calendar = () => {
  const freeSlots = useAppSelector((state) => state.book.freeSlots);
  const selectedDate = useAppSelector((state) => state.book.selectedDate);
  const dispatch = useAppDispatch();

  const getOnClickHandler = (date: Date) => () => {
    dispatch(bookActions.setDate(date));
  };

  return (
    <div className="mt-4">
      <h1 className="flex w-full justify-center text-2xl font-bold text-gray-800">
        2023
      </h1>
      <div className="flex gap-4 mt-4">
        {freeSlots.map((spot, i) => (
          <Day
            key={`${spot.date}`}
            day={spot.date.getDate()}
            dayName={spot.date.toLocaleDateString("en-US", {
              weekday: "short",
            })}
            isNow={isToday(spot.date)}
            isSelected={selectedDate === spot.date}
            isDisabled={i === 1}
            onClick={getOnClickHandler(spot.date)}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
