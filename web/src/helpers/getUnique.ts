export const getUnique = (arr: any[], comp: string) => {
  return arr
    .map((item) => item[comp])
    .map((item, i, final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item as any])
    .map((item) => arr[item as any]);
};
