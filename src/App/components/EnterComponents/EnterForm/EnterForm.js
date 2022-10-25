import React, { useState } from 'react';
import { AuthenticationForm } from '@/App/components/EnterComponents/AuthenticationForm/AuthenticationForm';
import { RegistrationForm } from '@components/EnterComponents//RegistrationForm/RegistrationForm';
import './EnterForm.scss';

export function EnterForm() {
  const [activeTab, setActiveTab] = useState('Authentication');

  const onChangeActiveTab = (isActiveTab) => {
    setActiveTab(isActiveTab);
  };

  return (
    <div className='enter-section__body'>
      <div className='enter-section__tab'>
        <button
          className={`enter-section__tab-button ${
            activeTab === 'Authentication' && 'enter-section__tab-button--active'
          }`}
          onClick={() => onChangeActiveTab('Authentication')}
        >
          Authentication
        </button>
        <button
          className={`enter-section__tab-button ${
            activeTab === 'Registration' && 'enter-section__tab-button--active'
          }`}
          onClick={() => onChangeActiveTab('Registration')}
        >
          Registration
        </button>
      </div>
      {activeTab === 'Authentication' && <AuthenticationForm />}
      {activeTab === 'Registration' && <RegistrationForm />}
    </div>
  );
}
