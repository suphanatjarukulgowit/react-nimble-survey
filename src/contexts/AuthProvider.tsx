import React, { createContext } from 'react';

import useLocalStorage from 'hooks/useLocalStorageAuth';
import { LocalStorageKey } from 'lib/localStorage';
import { Auths } from 'types/auth';
import { UserProfile } from 'types/userProfile';

type Nullable<T> = T | null;

interface AuthContextType {
  auth: Nullable<Auths>;
  setAuth: (authData: Nullable<Auths>) => void;
  userProfile: Nullable<UserProfile>;
  setUserProfile: (userData: Nullable<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => {
     // eslint-disable-next-line
  },
  userProfile: null,
  setUserProfile: () => {
     // eslint-disable-next-line
  },
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useLocalStorage(LocalStorageKey.auth);
  const [userProfile, setUserProfile] = useLocalStorage(LocalStorageKey.userProfile);
  return <AuthContext.Provider value={{ auth, setAuth, userProfile, setUserProfile }}>{children}</AuthContext.Provider>;
};
export default AuthContext;
