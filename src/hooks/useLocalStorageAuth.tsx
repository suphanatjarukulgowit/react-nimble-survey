import { useEffect, useState } from 'react';

import { LocalStorageKey, setLocalStorageValue, getLocalStorageValue, removeLocalStorageValue } from 'lib/localStorage';
import { Auths } from 'types/auth';

type Nullable<T> = T | null;

const useLocalStorageAuth = (): [Nullable<Auths>, (authData: Nullable<Auths>) => void] => {
  const [auth, setAuth] = useState<Nullable<Auths>>(null);

  useEffect(() => {
    const authData = getLocalStorageValue(LocalStorageKey.auth);
    setAuth(authData);
  }, []);

  useEffect(() => {
    if (auth) {
      setLocalStorageValue(LocalStorageKey.auth, auth);
    } else {
      removeLocalStorageValue(LocalStorageKey.auth);
    }
  }, [auth]);

  return [auth, setAuth];
};

export default useLocalStorageAuth;
