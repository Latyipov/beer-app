import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useInputControl } from '@/App/components/useInputControl/useInputControl';
import { ValidationErrors } from '@/App/components/ValidationErrors/ValidationErrors';
import { signIn } from '@api-helpers/api-helpers';
import { SmallLoading } from '../SmallLoading/SmallLoading';

export function Authentication() {
  const [authenticationError, setAuthenticationError] = useState(null);
  const [smallLoading, setSmallLoading] = useState(false);

  const email = useInputControl('', { isInputEmpty: true, minLength: 3, isEmailValid: true });
  const password = useInputControl('', { isInputEmpty: true, minLength: 5 });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmitClick = (event) => {
    event.preventDefault();
    setAuthenticationError(null);
    setSmallLoading(true);
    signIn(
      email.inputValue.trim(),
      password.inputValue.trim(),
      { dispatch, navigate },
      setAuthenticationError,
      setSmallLoading,
    );
  };

  return (
    <div className='enter-form'>
      <h2 className='enter-form__head'>Enter form</h2>
      <form className='enter-form__form-box'>
        <ValidationErrors
          isInputSelected={email.isInputSelected}
          validationResult={email.validationResult}
        />
        <input
          className='enter-form__input'
          type='email'
          name='Email'
          placeholder='Email'
          value={email.inputValue}
          onBlur={email.onBlur}
          onChange={email.onChange}
        />

        <ValidationErrors
          isInputSelected={password.isInputSelected}
          validationResult={password.validationResult}
        />
        <input
          className='enter-form__input'
          type='password'
          name='Password'
          placeholder='Password'
          value={password.inputValue}
          onBlur={password.onBlur}
          onChange={password.onChange}
        />
        {authenticationError && <div className='enter-form__error'>{authenticationError}</div>}
        {smallLoading ? (
          <SmallLoading />
        ) : (
          <button
            disabled={
              !email.validationResult.isInputValid || !password.validationResult.isInputValid
            }
            className='enter-form__button'
            type='submit'
            onClick={onFormSubmitClick}
          >
            Sign in
          </button>
        )}
      </form>
    </div>
  );
}
