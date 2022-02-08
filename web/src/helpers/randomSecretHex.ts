export const randomSecureHex = (length: number) => {
  const maxlen = 8;
  const min = 16 ** (Math.min(length, maxlen) - 1);
  const max = 16 ** Math.min(length, maxlen) - 1;
  const numberResult = Math.floor(Math.random() * (max - min + 1)) + min;
  let result = numberResult.toString(16);

  while (result.length < length) {
    result += randomSecureHex(length - maxlen);
  }

  return result;
};
