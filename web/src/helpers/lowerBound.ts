// http://en.cppreference.com/w/cpp/algorithm/lower_bound
export function lowerBound<T>(arr: T[], value: T, less = (a: T, b: T) => a < b): number {
  let first = 0;
  let count = arr.length;
  let it: number, step: number;
  while (count > 0) {
    it = first;
    step = count >> 1;
    it += step;
    if (less(arr[it]!, value)) {
      first = it + 1;
      count -= step + 1;
    } else {
      count = step;
    }
  }
  return first;
}
