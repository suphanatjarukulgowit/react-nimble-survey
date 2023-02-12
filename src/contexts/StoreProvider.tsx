import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

import useLocalStorage from 'hooks/useLocalStorageAuth';
import { LocalStorageKey } from 'lib/localStorage';
import { Auths } from 'types/auth';
import { SurveyDetail } from 'types/survey';
import { UserProfile } from 'types/userProfile';

type Nullable<T> = T | null;

interface StoreContextType {
  auth: Nullable<Auths>;
  setAuth: (authData: Nullable<Auths>) => void;
  userProfile: Nullable<UserProfile>;
  setUserProfile: (userData: Nullable<UserProfile>) => void;
  background: string | null;
  setBackground: Dispatch<SetStateAction<string | null>>;
  currentSurvey: Nullable<SurveyDetail>;
  setCurrentSurvey: Dispatch<SetStateAction<Nullable<SurveyDetail>>>;
}

const StoreContext = createContext<StoreContextType>({
  auth: null,
  setAuth: () => {
    // this is just to prevent lint error
  },
  userProfile: null,
  setUserProfile: () => {
    // this is just to prevent lint error
  },
  background: null,
  setBackground: () => {
    // this is just to prevent lint error
  },
  currentSurvey: null,
  setCurrentSurvey: () => {
    // this is just to prevent lint error
  },
});

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [auth, setAuth] = useLocalStorage(LocalStorageKey.auth);
  const [userProfile, setUserProfile] = useLocalStorage(LocalStorageKey.userProfile);
  const [background, setBackground] = useState<string | null>(null);
  const [currentSurvey, setCurrentSurvey] = useState<Nullable<SurveyDetail>>(null);
  return (
    <StoreContext.Provider
      value={{ auth, setAuth, userProfile, setUserProfile, background, setBackground, currentSurvey, setCurrentSurvey }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContext;
