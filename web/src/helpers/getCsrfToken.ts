import { StorageKeys } from 'web/src/helpers/storageKeys';

export const getCsrfToken = () => localStorage.getItem(StorageKeys.csrfToken) || undefined;
