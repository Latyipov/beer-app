import React, { useState, FC } from 'react';
import { SignInForm } from '@/App/components/SignInForm/SignInForm';
import { SignUpForm } from '@/App/components/SignUpForm/SignUpForm';
import { Background } from '@components/Background/Background';
import backgroundImageLink from '@/App/images/background-wallpaper.jpg';
import './EnterPage.scss';

export const EnterPage: FC = () => {
  const [activeTab, setActiveTab] = useState<string>('signIn');
  return (
    <div className='enter-page'>
      <Background backgroundImageLink={backgroundImageLink} />
      <h1 className='enter-page__header'>Welcome</h1>
      <div className='enter-page__body'>
        <div className='enter-page__tabs'>
          <button
            className={`enter-page__tab-button ${
              activeTab === 'signIn' && 'enter-page__tab-button--active'
            }`}
            onClick={() => setActiveTab('signIn')}
          >
            Sign in
          </button>
          <button
            className={`enter-page__tab-button ${
              activeTab === 'signUp' && 'enter-page__tab-button--active'
            }`}
            onClick={() => setActiveTab('signUp')}
          >
            Sign up
          </button>
        </div>
        {activeTab === 'signIn' && <SignInForm />}
        {activeTab === 'signUp' && <SignUpForm />}
      </div>
    </div>
  );
};
