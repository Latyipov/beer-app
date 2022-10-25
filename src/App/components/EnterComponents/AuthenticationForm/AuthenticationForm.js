import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '@/App/Redux/store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useInputControl } from '@components/EnterComponents/useInputControl';
import { ValidationErrors } from '@components/EnterComponents/ValidationErrors/ValidationErrors';
import { getDataFromFirebase } from '@components/firebaseFunctions/getDataFromFirebase/getDataFromFirebase';

export function AuthenticationForm() {
  const [authenticationError, setAuthenticationError] = useState('');

  const email = useInputControl('', { isInputEmpty: true, minLength: 3, isEmailValid: true });
  const password = useInputControl('', { isInputEmpty: true, minLength: 5 });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFormSubmitClick = (event) => {
    event.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.inputValue, password.inputValue)
      .then(({ user }) => {
        getDataFromFirebase(user.uid, 'username').then((userName) => {
          dispatch(
            setUser({
              email: user.email,
              name: userName,
              id: user.uid,
              token: user.accessToken,
            }),
          );
          navigate('/');
        });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            setAuthenticationError('Wrong email. Try again.');
            break;
          case 'auth/wrong-password':
            setAuthenticationError('Wrong password. Try again.');
            break;
          case 'auth/user-not-found':
            setAuthenticationError('User not found.');
            break;
          case 'auth/too-many-requests':
            setAuthenticationError('Too many requests. Try later.');
            break;
          default:
            setAuthenticationError("Can't enter. Something wrong.");
        }
      });
  };

  return (
    <div className='enter-form'>
      <h2 className='enter-form__head'>Authentication</h2>
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
        <button
          disabled={!email.validationResult.isInputValid || !password.validationResult.isInputValid}
          className='enter-form__button'
          type='submit'
          onClick={onFormSubmitClick}
        >
          Enter
        </button>
      </form>
      <div className='error'>{authenticationError}</div>
    </div>
  );
}
