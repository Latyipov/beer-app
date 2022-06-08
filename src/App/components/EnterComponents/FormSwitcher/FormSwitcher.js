import React from 'react';
import { AuthorizationForm } from '@components/EnterComponents/AuthorizationForm/AuthorizationForm';
import { RegistrationForm } from '@components/EnterComponents//RegistrationForm/RegistrationForm';

export function FormSwitcher({ activeTab }) {
  switch (activeTab) {
    case 'Authorization':
      return <AuthorizationForm />;
    case 'Registration':
      return <RegistrationForm />;
  }
}
