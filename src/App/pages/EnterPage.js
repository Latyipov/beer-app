import React, { useState } from 'react';
import { Authentication } from '@/App/components/Authentication/Authentication';
import { Registration } from '@/App/components/Registration/Registration';
import { Background } from '@components/Background/Background';

import backgroundImageLink from '@/App/images/background-wallpaper.jpg';
import './EnterPage.scss';

export function EnterPage() {
  const [activeTab, setActiveTab] = useState('Authentication');

  const onChangeActiveTab = (isActiveTab) => {
    setActiveTab(isActiveTab);
  };
  return (
    <div className='enter-page'>
      <Background backgroundImageLink={backgroundImageLink} />
      <h1 className='enter-page__header'>Welcome</h1>
      <div className='enter-page__body'>
        <div className='enter-page__tabs'>
          <button
            className={`enter-page__tab-button ${
              activeTab === 'Authentication' && 'enter-page__tab-button--active'
            }`}
            onClick={() => onChangeActiveTab('Authentication')}
          >
            Sign in
          </button>
          <button
            className={`enter-page__tab-button ${
              activeTab === 'Registration' && 'enter-page__tab-button--active'
            }`}
            onClick={() => onChangeActiveTab('Registration')}
          >
            Sign up
          </button>
        </div>
        {activeTab === 'Authentication' && <Authentication />}
        {activeTab === 'Registration' && <Registration />}
      </div>
    </div>
  );
}
