import { bookActions } from "store/book-slice";
import { Option, Row } from "./Row";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { getDateString, getTime } from "utils/dateTime";

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
      className="h-8 w-14"
    >
      <span className={`${textColor} text-sm`}>{hour}</span>
    </Option>
  );
};

const HourSelector = () => {
  const freeSlots = useAppSelector((state) => state.book.freeSlots);
  const selectedDate = useAppSelector((state) => state.book.selectedDate);
  const selectedTime = useAppSelector((state) => state.book.selectedTime);
  const dispatch = useAppDispatch();

  const availableHours = freeSlots.reduce((acc: string[], curr) => {
    const date = getDateString(curr);
    if (date !== selectedDate) return acc;
    const hour = getTime(curr);
    acc.push(hour);
    return acc;
  }, []);

  const getOnHourClickHandler = (hour: string) => () =>
    dispatch(bookActions.setTime(hour));

  return (
    <>
      {availableHours?.length > 0 && (
        <Row>
          {availableHours.map((hour) => (
            <Hour
              key={`${hour}`}
              hour={hour}
              isNow={false}
              isSelected={selectedTime === hour}
              isDisabled={false}
              onClick={getOnHourClickHandler(hour)}
            />
          ))}
        </Row>
      )}
      {availableHours?.length === 0 && (
        <div className="my-4 mx-8 font-semibold text-gray-400">
          Please select a date to continue
        </div>
      )}
    </>
  );
};

export default HourSelector;
