import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import Button from 'components/Button';
import { UserProfile } from 'types/userProfile';

interface UserProfileProps {
  userProfile: UserProfile;
  onLogout: () => void;
}

const userProfileDatatestIds = {
  userName: 'userName',
  userLine: 'userLine',
  userAvatar: 'userAvatar',
  logOutButton: 'loggoutButton',
  appVersion: 'appVersion',
  userProfileContainer: 'userProfileContainer',
  userMenu: 'userMenu',
};

const UserProfileData = ({ userProfile, onLogout }: UserProfileProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const userMenuCollapseRef = useRef<HTMLDivElement>(null);

  const toggleUserMenu = () => {
    setIsOpen(!isOpen);
  };

  document.addEventListener('mousedown', (e) => {
    if (isOpen && userMenuCollapseRef.current && !userMenuCollapseRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  });

  const collapseClasses = classNames('user-menu__collapse', isOpen ? 'user-menu__collapse--open' : 'user-menu__collapse--close');

  const AvatarToggler = (togglerProps: React.HTMLAttributes<HTMLButtonElement>) => {
    return (
      <Button type="button" className="user-button" onClick={toggleUserMenu} {...togglerProps}>
        <img className="user-avatar" src={userProfile?.avatarUrl} alt="user-avatar" />
      </Button>
    );
  };

  return (
    <>
      <div data-test-id={userProfileDatatestIds.userMenu}>
        <div data-test-id={userProfileDatatestIds.userAvatar}>
          <AvatarToggler />
        </div>
        <div data-test-id={userProfileDatatestIds.userProfileContainer} className={collapseClasses} ref={userMenuCollapseRef}>
          <AvatarToggler />
          <div data-test-id={userProfileDatatestIds.userName} className="user-name">
            {userProfile?.name}
          </div>
          <hr data-test-id={userProfileDatatestIds.userLine} className="user-line" />
          <Button data-test-id={userProfileDatatestIds.logOutButton} className="logout-button" onClick={onLogout}>
            {t('auth.sign_out')}
          </Button>
          <span data-test-id={userProfileDatatestIds.appVersion} className="app-version">
            {process.env.REACT_APP_VERSION}
          </span>
        </div>
      </div>
    </>
  );
};

export default UserProfileData;
