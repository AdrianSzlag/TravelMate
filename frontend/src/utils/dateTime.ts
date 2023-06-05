const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const getMonthName = (month: number): string => months[month - 1];
export const getMonthNameShort = (month: number): string =>
  months[month - 1].slice(0, 3);
export const getDayName = (date: string): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleString("en-US", { weekday: "short" });
};
export const getMonth = (date: string): number => parseInt(date.slice(5, 7));
export const getDay = (date: string): number => parseInt(date.slice(8, 10));
export const getDateString = (date: string): string => date.slice(0, 10);
export const getTime = (date: string): string => date.slice(11, 16);
export const areDatesEqual = (date1: string, date2: string): boolean => {
  return getDateString(date1) === getDateString(date2);
};