import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { createDataForNewUser } from '../../FirebaseComponents/createDataForNewUser/createDataForNewUser';

export function RegistrationFormAdder() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [invalidError, setInvalidError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmitClick = (event) => {
    event.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          }),
        );

        createDataForNewUser(user.uid, user.email);
        navigate('/');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setInvalidError('User with this email already exists.');
        } else if (error.code === 'auth/invalid-email') {
          setInvalidError('Invalid email.');
        } else if (error.code === 'auth/weak-password') {
          setInvalidError('Password should be at least 6 characters');
        } else {
          setInvalidError('Something wrong!');
        }
      });
  };

  return (
    <div className='EnterForm'>
      <h2>Authorization</h2>
      <form>
        <input
          className='EnterForm__item'
          type='email'
          name='Email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='EnterForm__item'
          type='password'
          name='Password'
          minLength='6'
          placeholder='Password'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button className='btn' type='submit' onClick={onFormSubmitClick}>
          Registrate
        </button>
      </form>
      <div className='error'>{invalidError}</div>
    </div>
  );
}
