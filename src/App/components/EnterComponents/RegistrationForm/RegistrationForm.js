import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '@/App/Redux/store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { createNewUser } from '@api-helpers/api-helpers';
import { useInputControl } from '@/App/components/EnterComponents/useInputControl/useInputControl';
import { ValidationErrors } from '@components/EnterComponents/ValidationErrors/ValidationErrors';

export function RegistrationForm() {
  const [registartionError, setRegistartionError] = useState('');

  const userName = useInputControl('', { isInputEmpty: true, minLength: 3 });
  const email = useInputControl('', { isInputEmpty: true, minLength: 5, isEmailValid: true });
  const password = useInputControl('', { isInputEmpty: true, minLength: 6 });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmitClick = (event) => {
    event.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.inputValue.trim(), password.inputValue.trim())
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email.trim(),
            name: userName.inputValue.trim(),
            id: user.uid,
            token: user.accessToken,
          }),
        );

        createNewUser(user.uid, user.email, userName.inputValue);
        navigate('/');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setRegistartionError('User with this email already exists.');
            break;
          case 'auth/invalid-email':
            setRegistartionError('Wrong email. Try again.');
            break;
          case 'auth/weak-password':
            setRegistartionError('Password should be at least 6 characters');
            break;
          case 'auth/too-many-requests':
            setRegistartionError('Too many requests. Try later.');
            break;
          default:
            setRegistartionError("Can't register. Something wrong.");
        }
      });
  };

  return (
    <div className='enter-form'>
      <h2 className='enter-form__head'>Registration form</h2>
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
        <div className='enter-form__error'>{registartionError}</div>
        <button
          disabled={!email.validationResult.isInputValid || !password.validationResult.isInputValid}
          className='enter-form__button'
          type='submit'
          onClick={onFormSubmitClick}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
