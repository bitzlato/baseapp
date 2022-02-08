export const formatDate = (date: string) => {
  const [day, month, year] = date.split('/');

  let formatDay = day || '';
  formatDay =
    formatDay === '' || (parseFloat(formatDay) <= 31 && formatDay !== '00') ? formatDay : '31';
  let formatMonth = month || '';
  formatMonth =
    formatMonth === '' || (parseFloat(formatMonth) <= 12 && formatMonth !== '00')
      ? formatMonth
      : '12';
  const formatYear = year ? parseFloat(year) : '';

  if (formatDay && formatMonth && formatYear) {
    return `${formatDay}/${formatMonth}/${formatYear}`;
  }
  if (formatDay && formatMonth) {
    return `${formatDay}/${formatMonth}`;
  }
  return `${formatDay}`;
};
