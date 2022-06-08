import React from 'react';
import { EnterForm } from '@components/EnterComponents/EnterForm/EnterForm';
import './EnterPage.css';

export function EnterPage() {
  return (
    <div className='bodyApp'>
      <h1 className='bodyApp__h1'>Welcome</h1>
      <EnterForm />
    </div>
  );
}
