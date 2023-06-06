import { useState } from "react";
import IOpeningHours from "types/IOpeningHours";
import { days, getTime } from "utils/dateTime";

interface SelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const Selector = ({ value, onChange }: SelectorProps) => {
  const time = new Date("1970-01-01T00:00:00.000Z");
  const times = [...Array(4 * 24)].map((_, i) => {
    const current = getTime(time.toISOString());
    time.setMinutes(time.getMinutes() + 15);
    return current;
  });
  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };
  return (
    <select value={value} onChange={onChangeHandler} className="border rounded">
      <option value="--:--">--:--</option>
      {times.map((current) => {
        return (
          <option value={current} key={current}>
            {current}
          </option>
        );
      })}
    </select>
  );
};

interface Props {
  value: IOpeningHours;
  onChange: (value: IOpeningHours) => void;
}

const TimeSelector = ({ value, onChange }: Props) => {
  const { dayOfWeek, from, to } = value;
  const day = days[value.dayOfWeek];
  const setFrom = (value: string) => {
    onChange({ dayOfWeek, to, from: value });
  };
  const setTo = (value: string) => {
    onChange({ dayOfWeek, from, to: value });
  };
  return (
    <div className={`flex items-center ${dayOfWeek === 0 && "order-last"}`}>
      <span className="w-1/4">{day}</span>
      <div className="flex w-3/4">
        <Selector value={from} onChange={setFrom} />
        <span className="mx-2">to</span>
        <Selector value={to} onChange={setTo} />
      </div>
    </div>
  );
};

export default TimeSelector;
