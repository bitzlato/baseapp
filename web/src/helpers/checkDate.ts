export const isDateInFuture = (date: string) => {
  const [day, month, year] = date.split('/');
  const inputDate = new Date(`${month}/${day}/${year}`);
  const curDate = new Date();

  return inputDate > curDate;
};

const months = {
  January: '01',
  February: '02',
  March: '03',
  April: '04',
  May: '05',
  June: '06',
  July: '07',
  August: '08',
  September: '09',
  October: '10',
  November: '11',
  December: '12',
};

export const monthNameToNumber = (month: string) => {
  return months[month as keyof typeof months];
};

type Timestamp = number;

export function isToday(date: Timestamp): boolean {
  const today = new Date().setHours(0, 0, 0, 0);
  const thatDay = new Date(date).setHours(0, 0, 0, 0);

  return today === thatDay;
}

export function isYesterday(date: Timestamp): boolean {
  const today = new Date();
  const yesterdayTimestamp = today.setDate(today.getDate() - 1);
  const yesterday = new Date(yesterdayTimestamp).setHours(0, 0, 0, 0);
  const thatDay = new Date(date).setHours(0, 0, 0, 0);

  return yesterday === thatDay;
}
