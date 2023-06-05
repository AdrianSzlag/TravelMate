import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { Option, Row } from "./Row";
import { getDateString, getDay, getDayName } from "utils/dateTime";
import { bookActions } from "store/book-slice";
import isToday from "utils/isToday";

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

const DaySelector = () => {
  const freeSlots = useAppSelector((state) => state.book.freeSlots);
  const selectedDate = useAppSelector((state) => state.book.selectedDate);

  const dispatch = useAppDispatch();
  const distinctDates: string[] = freeSlots.reduce((acc: string[], curr) => {
    const date = getDateString(curr);
    if (!acc.find((item) => item === date)) acc.push(date);
    return acc;
  }, []);

  const getOnDateClickHandler = (date: string) => () =>
    dispatch(bookActions.setDate(date));

  return (
    <Row>
      {distinctDates.map((date) => {
        const day = getDay(`${date}T00:00:00.000Z`);
        const dayName = getDayName(`${date}T00:00:00.000Z`);
        return (
          <Day
            key={`${date}`}
            day={day}
            dayName={dayName}
            isNow={isToday(date)}
            isSelected={selectedDate === date}
            isDisabled={false}
            onClick={getOnDateClickHandler(date)}
          />
        );
      })}
    </Row>
  );
};

export default DaySelector;