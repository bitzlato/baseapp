export const getDiffValue = (curValue: string, prevValue: string): [string, string] => {
  let diff = '';
  let match = curValue;
  let prev = prevValue;

  while (match !== prev && match.length > 0) {
    diff = match[match.length - 1] + diff;
    match = match.slice(0, -1);
    prev = prev.slice(0, -1);
  }

  return [match, diff];
};
