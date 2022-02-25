export type SWR<Data = any, Error = unknown> =
  | {
      data: Data;
      error: undefined;
    }
  | {
      data: undefined;
      error: undefined;
    }
  | {
      data: undefined;
      error: Error;
    };

export const fetcher = (input: RequestInfo, init: RequestInit) =>
  fetch(input, init).then((res) => res.json());
