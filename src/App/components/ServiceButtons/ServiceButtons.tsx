import React, { FC, useState, MouseEvent } from 'react';
import { SmallLoading } from '@components/SmallLoading/SmallLoading';
import { googleAuth, githubAuth } from '@api-helpers/api-helpers';
import GoogleLogo from '../../images/btn_google_dark_normal_ios.svg';
import GitHub from '../../images/github-mark.svg';
import './ServiceButtons.scss';

export const ServiceButtons: FC = () => {
  const [signInError, setSignInError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onGoogleButtonClick = (event: MouseEvent<HTMLButtonElement>): undefined => {
    event.preventDefault();
    setLoading(true);
    setSignInError(null);
    googleAuth().then((response) => {
      if (response.isError) {
        setSignInError(response.isError);
        setLoading(false);
      }
    });
    return undefined;
  };
  const onGitButtonClick = (event: MouseEvent<HTMLButtonElement>): undefined => {
    event.preventDefault();
    setLoading(true);
    setSignInError(null);
    githubAuth().then((response) => {
      if (response.isError) {
        setSignInError(response.isError);
        setLoading(false);
      }
    });
    return undefined;
  };

  return (
    <div className='service-buttons'>
      {!!signInError && <div className='enter-form__error'>{signInError}</div>}
      {loading ? (
        <SmallLoading />
      ) : (
        <div className='service-buttons__wrapper'>
          <button className='service-buttons__btn google-btn' onClick={onGoogleButtonClick}>
            <img className='google-btn__icon' src={GoogleLogo} />
            <p className='google-btn__text'>Sign in with google</p>
          </button>
          <button className='service-buttons__btn github-btn' onClick={onGitButtonClick}>
            <img className='github-btn__icon' src={GitHub} />
            <p className='github-btn__text'>Sign in with GitHub</p>
          </button>
        </div>
      )}
    </div>
  );
};
