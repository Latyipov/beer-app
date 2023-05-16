import React, { useState, MouseEvent } from 'react';
import { useInputControl } from '@components/useInputControl/useInputControl';
import { ValidationErrors } from '@components/ValidationErrors/ValidationErrors';
import { SmallLoading } from '@components/SmallLoading/SmallLoading';
import { signUp } from '@api-helpers/api-helpers';
import { useNavigate } from 'react-router-dom';

export const SignUpForm = () => {
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const userName = useInputControl('', { isInputEmpty: true, minLength: 3 });
  const email = useInputControl('', { isInputEmpty: true, minLength: 5, isEmailValid: true });
  const password = useInputControl('', { isInputEmpty: true, minLength: 6 });
  const navigate = useNavigate();

  const onFormSubmitClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSignUpError(null);
    setLoading(true);
    const signUpReply = await signUp({
      userName: userName.inputValue.trim(),
      email: email.inputValue.trim(),
      password: password.inputValue.trim(),
    });
    if (!signUpReply.isError) {
      navigate('/');
    } else {
      setSignUpError(signUpReply.isError);
    }
    setLoading(false);
    return undefined;
  };
  return (
    <div className='enter-form'>
      <h2 className='enter-form__head'>Sign Up form</h2>
      <form className='enter-form__form-box'>
        {userName.isInputSelected && (
          <ValidationErrors validationResult={userName.validationResult} />
        )}
        <input
          className='enter-form__input'
          type='text'
          name='UserName'
          placeholder='Name'
          value={userName.inputValue}
          onBlur={userName.onBlur}
          onChange={userName.onChange}
        />
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
        {signUpError && <div className='enter-form__error'>{signUpError}</div>}
        {loading ? (
          <SmallLoading />
        ) : (
          <button
            disabled={
              !email.validationResult.isInputValid ||
              !password.validationResult.isInputValid ||
              !userName.validationResult.isInputValid
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
};
