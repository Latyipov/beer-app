import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../../../store/slices/userSlice';
import { useDispatch } from 'react-redux';

export function AuthorizationFormAdder() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

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
      .catch(console.error);
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
          Enter
        </button>
      </form>
    </div>
  );
}
