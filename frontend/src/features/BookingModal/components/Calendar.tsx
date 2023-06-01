import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { getMonth, getMonthName } from "utils/dateTime";
import DaySelector from "./DaySelector";
import HourSelector from "./HourSelector";

const Calendar = () => {
  const freeSlots = useAppSelector((state) => state.book.freeSlots);
  const selectedDate = useAppSelector((state) => state.book.selectedDate);
  const selectedTime = useAppSelector((state) => state.book.selectedTime);
  const dispatch = useAppDispatch();

  const distinctMonths: string[] = freeSlots
    .reduce((acc: number[], curr) => {
      const month = getMonth(curr);
      if (!acc.find((item) => item === month)) acc.push(month);
      return acc;
    }, [])
    .map((month) => getMonthName(month));

  const monthsString = distinctMonths.join(" - ");

  return (
    <div className="mt-4">
      <h1 className="flex w-full justify-center text-2xl font-bold text-gray-800 ">
        {monthsString} 2023
      </h1>
      <DaySelector />
      <div className="border-b w-full mt-4"></div>
      <HourSelector />
      <div className="border-b w-full mt-4"></div>
    </div>
  );
};

export default Calendar;
