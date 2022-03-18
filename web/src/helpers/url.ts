import { RouterProps } from 'react-router';

export function getSearchParam(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key);
}

export function setLocation(path: string, history?: RouterProps['history']) {
  if (path.includes('p2p')) {
    window.location.href = path;
  } else if (history) {
    history.push(path);
  }
}
