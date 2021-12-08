export function parseHash(): Record<string, string> {
  const result: Record<string, string> = {};
  for (const kv of location.hash.substring(1).split('&')) {
    const [key, value] = kv.split('=');
    if (key) {
      result[key] = value;
    }
  }
  return result;
}

export function clearHash() {
  window.location.hash = '';
  window.history.replaceState('', '', window.location.pathname);
}
