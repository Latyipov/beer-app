import React from 'react';
import { AuthorizationFormAdder } from '../AuthorizationFormAdder/AuthorizationFormAdder';
import { RegistrationFormAdder } from '../RegistrationFormAdder/RegistrationFormAdder';

export function FormSwitcher({ activeTab }) {
  switch (activeTab) {
    case 'Authorization':
      return <AuthorizationFormAdder />;
    case 'Registration':
      return <RegistrationFormAdder />;
  }
}
