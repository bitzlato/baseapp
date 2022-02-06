export const accumulateVolume = (array: any) => {
  const total: number[] = [];
  array
    .map((item: any) => {
      return item[1];
    })
    .reduce((accumulator: any, currentValue: any, currentIndex: any) => {
      total[currentIndex] = Number(accumulator) + Number(currentValue);

      return Number(accumulator) + Number(currentValue);
    }, 0);

  return total;
};
