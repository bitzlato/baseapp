export const convertToString = (elem: any) => {
  if (elem !== undefined && elem !== null) {
    return elem.toString();
  }

  return '';
};
