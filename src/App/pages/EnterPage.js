import React from 'react';
import { EnterForm } from '@components/EnterComponents/EnterForm/EnterForm';
import { Background } from '../components/Background/Background';

import backgroundImageLink from '@/App/images/background_wallpaper.jpg';
import './EnterPage.scss';

export function EnterPage() {
  return (
    <div className='enter-page'>
      <Background backgroundImageLink={backgroundImageLink} />
      <h1 className='enter-page__header'>Welcome</h1>
      <EnterForm />
    </div>
  );
}
