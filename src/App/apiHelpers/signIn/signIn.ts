import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getData } from '@api-helpers/api-helpers';
import UserState from '@/App/services/MobX/store/UserState';

export async function signIn(email: string, password: string) {
  try {
    const { user } = await signInWithEmailAndPassword(getAuth(), email, password);
    const userName: string = await getData(user.uid, 'username');
    !!user.email && UserState.setStateUser(user.email, userName, user.uid);

    return {
      isError: null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        isError: error.message,
      };
    }
    return {
      isError: 'unexpected Error',
    };
  }
}
