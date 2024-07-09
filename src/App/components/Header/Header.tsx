import React, { useState } from 'react';
import { BurgerButton } from '../BurgerButton/BurgerButton';
import { Navigation } from '../Navigation/Navigation';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import UserState from '@/App/services/MobX/store/UserState';

import './Header.scss';

export function Header() {
  const userId = UserState.userStateData.id;
  const userName = UserState.userStateData.name;
  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const onClickSignOutButton = () => {
    signOut(getAuth());
    UserState.removeStateUser();
    navigate('/enter');
  };
  const onClickSignInButton = () => {
    navigate('/enter');
  };

  return (
    <header className='header'>
      <div className='header__menu'>
        <BurgerButton isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
        <Navigation isBurgerOpen={isBurgerOpen} />
        {isBurgerOpen && (
          <div className='header__menu-liner' onClick={() => setIsBurgerOpen(false)}></div>
        )}
      </div>
      {!!userName && <div className='header__greet'> Hello {userName}!</div>}
      {!userId ? (
        <button className='header__out-button' onClick={onClickSignInButton}>
          Sign In/Sign Up
        </button>
      ) : (
        <button className='header__out-button' onClick={onClickSignOutButton}>
          Sign out
        </button>
      )}
    </header>
  );
}
