import { Auths } from 'types/auth';
import { UserProfile } from 'types/userProfile';

export const enum LocalStorageKey {
  auth = 'auth',
  userProfile = 'userProfile',
}

type Nullable<T> = T | null;

export type LocalStorageValue<T> = T extends LocalStorageKey.auth ? Nullable<Auths> : Nullable<UserProfile>;

const getLocalStorageValue = <T extends LocalStorageKey>(key: T): LocalStorageValue<T> => {
  const storedJsonValue = localStorage.getItem(key);

  return storedJsonValue ? JSON.parse(storedJsonValue) : null;
};

const setLocalStorageValue = <T extends LocalStorageKey>(key: T, newValue: LocalStorageValue<T>): void => {
  localStorage.setItem(key, JSON.stringify(newValue));
};

const removeLocalStorageValue = <T extends LocalStorageKey>(key: T): void => {
  localStorage.removeItem(key);
};

export { getLocalStorageValue, setLocalStorageValue, removeLocalStorageValue };
