export function join<T>(arr: T[], separator: T): T[] {
  const res = new Array<T>();
  for (let i = 0; i < arr.length; i++) {
    if (i > 0) {
      res.push(separator);
    }
    res.push(arr[i]!);
  }
  return res;
}
