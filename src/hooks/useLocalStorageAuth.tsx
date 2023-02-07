import { useEffect, useState } from 'react';

import {
  LocalStorageKey,
  setLocalStorageValue,
  getLocalStorageValue,
  removeLocalStorageValue,
  LocalStorageValue,
} from 'lib/localStorage';

const useLocalStorage = <T extends LocalStorageKey>(
  key: T,
  defaultValue: LocalStorageValue<T> = null as LocalStorageValue<T>
): [LocalStorageValue<T>, React.Dispatch<LocalStorageValue<T>>] => {
  const [value, setValue] = useState<LocalStorageValue<T>>(defaultValue);

  useEffect(() => {
    const data = getLocalStorageValue(key);
    setValue(data || defaultValue);
  }, []);

  useEffect(() => {
    if (value) {
      setLocalStorageValue(key, value);
    } else {
      removeLocalStorageValue(key);
    }
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
