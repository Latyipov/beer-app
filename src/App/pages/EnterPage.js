import React from 'react';
import { EnterForm } from '@components/EnterComponents/EnterForm/EnterForm';
import './EnterPage.scss';

export function EnterPage() {
  return (
    <div className='enter-page'>
      <h1 className='enter-page__header'>Welcome</h1>
      <EnterForm />
    </div>
  );
}
