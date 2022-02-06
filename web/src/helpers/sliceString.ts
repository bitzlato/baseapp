export const sliceString = (str: string | any[], period: number) => {
  return str ? (str.length > period ? `${str.slice(0, period)}...` : str) : str;
};
