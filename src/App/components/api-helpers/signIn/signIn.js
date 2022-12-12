import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '@/App/Redux/store/slices/userSlice';
import { getData } from '@api-helpers/api-helpers';

export async function signIn(email, password, onSuccess, onError, onLoad) {
  try {
    const { user } = await signInWithEmailAndPassword(getAuth(), email, password);
    const userName = await getData(user.uid, 'username');
    await onSuccess.dispatch(
      setUser({
        email: user.email,
        name: userName,
        id: user.uid,
        token: user.accessToken,
      }),
    );
    onLoad(false);
    onSuccess.navigate('/');
    return undefined;
  } catch (error) {
    await onLoad(false);
    switch (error.code) {
      case 'auth/invalid-email':
        onError('Wrong email. Try again.');
        break;
      case 'auth/wrong-password':
        onError('Wrong password. Try again.');
        break;
      case 'auth/user-not-found':
        onError('User not found.');
        break;
      case 'auth/too-many-requests':
        onError('Too many requests. Try later.');
        break;
      default:
        onError("Can't enter. Something wrong.");
    }
  }
}
