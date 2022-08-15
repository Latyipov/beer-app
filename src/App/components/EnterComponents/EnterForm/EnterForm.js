import React, { useState } from 'react';
import { AuthorizationForm } from '@components/EnterComponents/AuthorizationForm/AuthorizationForm';
import { RegistrationForm } from '@components/EnterComponents//RegistrationForm/RegistrationForm';

export function EnterForm() {
  const [activeTab, setActiveTab] = useState('Authorization');

  const onChangeActiveTab = (isActiveTab) => {
    setActiveTab(isActiveTab);
  };

  return (
    <div className='bodyApp__enterForm'>
      <div className='tabButtons'>
        <button
          className={`tab ${activeTab === 'Authorization' && ' active-tab'}`}
          onClick={() => onChangeActiveTab('Authorization')}
        >
          Authorization
        </button>
        <button
          className={`tab ${activeTab === 'Registration' && ' active-tab'}`}
          onClick={() => onChangeActiveTab('Registration')}
        >
          Registration
        </button>
      </div>
      {activeTab === 'Authorization' && <AuthorizationForm />}
      {activeTab === 'Registration' && <RegistrationForm />}
    </div>
  );
}
