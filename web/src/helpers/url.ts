import { RouterProps } from 'react-router';

export function getSearchParam(key: string, search?: string): string | null {
  return new URLSearchParams(search ?? window.location.search).get(key);
}

export function setLocation(path: string, history?: RouterProps['history']) {
  if (path.includes('p2p') || !history) {
    window.location.href = path;
  } else {
    history.push(path);
  }
}
