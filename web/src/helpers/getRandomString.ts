const CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz+/';

export function getRandomString(length: number): string {
  let result = '';
  while (length > 0) {
    const bytes = new Uint8Array(16);
    const random = window.crypto.getRandomValues(bytes);
    random.forEach((c) => {
      if (length !== 0 && c < CHARSET.length) {
        result += CHARSET[c];
        length--;
      }
    });
  }
  return result;
}
