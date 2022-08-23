export const getDiffByDays = (dateFrom: Date, dateTo: Date) => {
  const difference = dateTo.getTime() - dateFrom.getTime();

  return Math.ceil(difference / (1000 * 3600 * 24));
};
