import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '@/App/store/slices/userSlice';
import { useDispatch } from 'react-redux';

export function AuthorizationForm() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [invalidError, setInvalidError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmitClick = (event) => {
    event.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          }),
        );

        navigate('/');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          setInvalidError('Wrong email. Try again.');
        } else if (error.code === 'auth/wrong-password') {
          setInvalidError('Wrong password. Try again.');
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
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className='EnterForm__item'
          type='password'
          name='Password'
          minLength='6'
          placeholder='Password'
          value={pass}
          onChange={(event) => setPass(event.target.value)}
        />
        <button className='btn' type='submit' onClick={onFormSubmitClick}>
          Enter
        </button>
      </form>
      <div className='error'>{invalidError}</div>
    </div>
  );
}
