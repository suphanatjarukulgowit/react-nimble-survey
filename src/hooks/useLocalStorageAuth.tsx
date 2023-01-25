import { useEffect, useState } from 'react';

import { Auths } from 'types/auth';

type Nullable<T> = T | null;

const useLocalStorageAuth = (): [Nullable<Auths>, (authData: Nullable<Auths>) => void] => {
  const [auth, setAuth] = useState<Nullable<Auths>>(null);

  useEffect(() => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      setAuth(JSON.parse(authData));
    }
  }, []);

  useEffect(() => {
    if (auth) {
      localStorage.setItem('auth', JSON.stringify(auth));
    } else {
      localStorage.removeItem('auth');
    }
  }, [auth]);

  return [auth, setAuth];
};

export default useLocalStorageAuth;
