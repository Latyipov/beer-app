import React, { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useInputControl } from '@components/useInputControl/useInputControl';
import { ValidationErrors } from '@components/ValidationErrors/ValidationErrors';
import { SmallLoading } from '@components/SmallLoading/SmallLoading';
import { signUp } from '@api-helpers/api-helpers';

export function SignUpForm() {
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userName = useInputControl('', { isInputEmpty: true, minLength: 3 });
  const email = useInputControl('', { isInputEmpty: true, minLength: 5, isEmailValid: true });
  const password = useInputControl('', { isInputEmpty: true, minLength: 6 });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmitClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setSignUpError(null);
    setIsLoading(true);
    signUp(
      userName.inputValue.trim(),
      email.inputValue.trim(),
      password.inputValue.trim(),
      { dispatch, navigate },
      setSignUpError,
      setIsLoading,
    );
    return undefined;
  };

  return (
    <div className='enter-form'>
      <h2 className='enter-form__head'>Sign Up form</h2>
      <form className='enter-form__form-box'>
        <ValidationErrors
          isInputSelected={userName.isInputSelected}
          validationResult={userName.validationResult}
        />
        <input
          className='enter-form__input'
          type='text'
          name='UserName'
          placeholder='Name'
          value={userName.inputValue}
          onBlur={userName.onBlur}
          onChange={userName.onChange}
        />
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
        {signUpError && <div className='enter-form__error'>{signUpError}</div>}
        {isLoading ? (
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
            Sign up
          </button>
        )}
      </form>
    </div>
  );
}
