import React, { createContext } from 'react';

import useLocalStorageAuth from 'hooks/useLocalStorageAuth';
import { Auths } from 'types/auth';

type Nullable<T> = T | null;

interface AuthContextType {
  auth: Nullable<Auths>;
  setAuth: (authData: Nullable<Auths>) => void;
}

const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: (_authData: Nullable<Auths>) => {
    // eslint-disable-next-line
  },
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useLocalStorageAuth();
  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
export default AuthContext;
