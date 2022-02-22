export function formatSeconds(sec: number): string {
  const minutes = `${Math.floor(sec / 60)}`.padStart(2, '0');
  const seconds = `${Math.floor(sec % 60)}`.padStart(2, '0');
  return `${minutes}:${seconds}`;
}
