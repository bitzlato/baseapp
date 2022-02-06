export const sliceArray = (data: any, limit: number) => {
  const temp = data;
  if (!temp) {
    return temp;
  }

  if (temp.length > limit) {
    temp.length = limit;
  }

  return temp;
};
