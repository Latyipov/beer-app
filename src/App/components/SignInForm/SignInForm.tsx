import React, { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useInputControl } from '@/App/components/useInputControl/useInputControl';
import { ValidationErrors } from '@/App/components/ValidationErrors/ValidationErrors';
import { signIn } from '@api-helpers/api-helpers';
import { SmallLoading } from '../SmallLoading/SmallLoading';

export function SignInForm() {
  const [signInError, setSignInError] = useState<string | null>(null);
  const [smallLoading, setSmallLoading] = useState<boolean>(false);

  const email = useInputControl('', { isInputEmpty: true, minLength: 3, isEmailValid: true });
  const password = useInputControl('', { isInputEmpty: true, minLength: 5 });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmitClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setSignInError(null);
    setSmallLoading(true);
    signIn(
      email.inputValue.trim(),
      password.inputValue.trim(),
      { dispatch, navigate },
      setSignInError,
      setSmallLoading,
    );
    return undefined;
  };

  return (
    <div className='enter-form'>
      <h2 className='enter-form__head'>Sign In form</h2>
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
        {!!signInError && <div className='enter-form__error'>{signInError}</div>}
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
