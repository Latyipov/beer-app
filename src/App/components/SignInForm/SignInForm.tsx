import React, { useState, MouseEvent, FC } from 'react';
import { useInputControl } from '@/App/features/useInputControl/useInputControl';
import { ValidationErrors } from '@/App/components/ValidationErrors/ValidationErrors';
import { signIn } from '@api-helpers/api-helpers';
import { SmallLoading } from '@components/SmallLoading/SmallLoading';

export const SignInForm: FC = () => {
  const [signInError, setSignInError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const email = useInputControl('', { isInputEmpty: true, minLength: 3, isEmailValid: true });
  const password = useInputControl('', { isInputEmpty: true, minLength: 5 });

  const onFormSubmitClick = (event: MouseEvent<HTMLButtonElement>): undefined => {
    event.preventDefault();
    setSignInError(null);
    setLoading(true);
    signIn({
      email: email.inputValue.trim(),
      password: password.inputValue.trim(),
    }).then((response) => {
      if (response.isError) {
        setSignInError(response.isError);
        setLoading(false);
      }
    });
    return undefined;
  };

  return (
    <div className='enter-form'>
      <h2 className='enter-form__head'>Sign In form</h2>
      <form className='enter-form__form-box'>
        {email.isInputSelected && <ValidationErrors validationResult={email.validationResult} />}
        <input
          className='enter-form__input'
          type='email'
          name='Email'
          placeholder='Email'
          value={email.inputValue}
          onBlur={email.onBlur}
          onChange={email.onChange}
        />

        {password.isInputSelected && (
          <ValidationErrors validationResult={password.validationResult} />
        )}
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
        {loading ? (
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
};
