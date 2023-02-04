import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import Button from 'components/Button';
import { UserProfile } from 'types/userProfile';

interface UserProfileProps {
  userProfile: UserProfile;
  onLogout: () => void;
}

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
      <AvatarToggler />
      <div className={collapseClasses} ref={userMenuCollapseRef}>
        <AvatarToggler />
        <div className="user-name">{userProfile?.name}</div>
        <hr className="user-line" />
        <Button className="logout-button" onClick={onLogout}>
          {t('auth.sign_out')}
        </Button>
        <span className="app-version">{process.env.REACT_APP_VERSION}</span>
      </div>
    </>
  );
};

export default UserProfileData;
