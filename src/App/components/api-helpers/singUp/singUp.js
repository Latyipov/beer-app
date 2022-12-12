import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '@/App/Redux/store/slices/userSlice';
import { createNewUser } from '@api-helpers/api-helpers';

export async function signUp(userName, email, password, onSuccess, onError, onLoad) {
  try {
    const { user } = await createUserWithEmailAndPassword(getAuth(), email, password);

    await onSuccess.dispatch(
      setUser({
        email: user.email,
        name: userName,
        id: user.uid,
        token: user.accessToken,
      }),
    );
    await createNewUser(user.uid, user.email, userName);
    onLoad(false);
    onSuccess.navigate('/');
    return undefined;
  } catch (error) {
    await onLoad(false);
    switch (error.code) {
      case 'auth/email-already-in-use':
        onError('User with this email already exists.');
        break;
      case 'auth/invalid-email':
        onError('Wrong email. Try again.');
        break;
      case 'auth/weak-password':
        onError('Password should be at least 6 characters');
        break;
      case 'auth/too-many-requests':
        onError('Too many requests. Try later.');
        break;
      default:
        onError("Can't register. Something wrong.");
    }
  }
}
