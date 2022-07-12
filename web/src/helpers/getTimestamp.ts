export const getTimestampWithoutTimezone = (date: Date) => {
  const time = date.getTime();
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;

  return time - userTimezoneOffset;
};
