import { StorageKeys } from 'web/src/helpers/storageKeys';

export const getCSRFToken = () => window.localStorage.getItem(StorageKeys.csrfToken) || undefined;

export const setCSRFToken = (token: string) =>
  window.localStorage.setItem(StorageKeys.csrfToken, token);

export const removeCSRFToken = () => window.localStorage.removeItem(StorageKeys.csrfToken);
