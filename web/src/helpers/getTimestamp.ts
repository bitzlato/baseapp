export const getTimestampWithoutTimezone = (date: Date) => {
  const time = date.getTime();
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;

  if (!time || !userTimezoneOffset) {
    return undefined;
  }

  return time - userTimezoneOffset;
};
