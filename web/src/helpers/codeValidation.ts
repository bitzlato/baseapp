export const OTP_TIMEOUT = 5;
export const PIN_TIMEOUT = 30;
export const EMAIL_RESEND_TIMEOUT = 60;

export function isValidCode(code: string): boolean {
  return code.match('^[0-9]{6}$') != null;
}
