export function parseHash(): Record<string, string> {
  const result: Record<string, string> = {};
  if (window.location.hash.length <= 1) {
    return result;
  }
  for (const kv of window.location.hash.substring(1).split('&')) {
    const [key, value] = kv.split('=');
    if (key) {
      result[key] = value!;
    }
  }
  return result;
}

export function parseMappedHash(map: Record<string, string | Function>): Record<string, any> {
  const hashValues = parseHash();
  const result: Record<string, string> = {};

  Object.entries(map).forEach(([potentialKey, hashResolver]) => {
    let objectKey = potentialKey, objectValue;

    if (typeof hashResolver === 'string') {
      if (hashResolver in hashValues) {
        objectValue = hashValues[hashResolver];
      }
    } else {
      const { key, fromHash } = hashResolver();
      if (key in hashValues) {
        objectValue = hashValues[key];
      }
      if (typeof fromHash === 'function') {
        objectValue = fromHash(objectValue);
      }
    }

    if (objectValue) {
      result[objectKey] = objectValue;
    }
  });

  return result;
}

export function setMappedHash(values: Record<string, any>, map: Record<string, string | Function>) {
  const newHash = '#' + Object.entries(map).reduce((parts: string[], [originalKey, hashKey]) => {
    let newKey, value;

    // resolve keys and values
    if (originalKey in values && typeof values[originalKey] !== 'undefined') {
      if (typeof hashKey === 'string') {
        value = values[originalKey].toString();
        newKey = hashKey;
      } else {
        const { key, toHash } = hashKey(values[originalKey]);
        value = toHash();
        newKey = key;
      }
    }

    // save resolved values
    if (value && newKey) {
      parts.push(`${newKey}=${value}`);
    }

    return parts;
  }, []).join('&');


  if (window.location.hash !== newHash) {
    console.info('setting hash', newHash)
    window.history.replaceState(undefined, '', newHash)
  }
}

export function clearHash() {
  window.location.hash = '';
  window.history.replaceState('', '', window.location.pathname);
}
