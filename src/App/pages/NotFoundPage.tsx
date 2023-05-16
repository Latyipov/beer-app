import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.scss';
import DogPicture from '../images/error-meme.png';

export function NotFoundPage() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div className='not-found-page'>
      <div className='not-found-page__img-title-box'>
        <img src={DogPicture} alt='dog-picture' className='not-found-page__image' />

        <h1 className='not-found-page__title'>404 Error</h1>
      </div>
      <p className='not-found-page__message'>Sorry. This page doesn&apos;t exist. </p>
      <button className='not-found-page__button' onClick={goBack}>
        Go back
      </button>
    </div>
  );
}
