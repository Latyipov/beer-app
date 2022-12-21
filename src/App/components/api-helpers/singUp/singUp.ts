import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { setUser } from '@/App/Redux/store/slices/userSlice';
import { createNewUser } from '@api-helpers/api-helpers';

type dispatchParameters = (action: Function) => void;

const signUp = async (
  userName: string,
  email: string,
  password: string,
  onSuccess: {
    dispatch: dispatchParameters;
    navigate: Function;
  },
  onError: (error: string) => void,
  isLoading: (arg: boolean) => void,
) => {
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
    isLoading(false);
    onSuccess.navigate('/');
    return undefined;
  } catch (error: firebase.FirebaseError) {
    await isLoading(false);
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
};

export { signUp };
