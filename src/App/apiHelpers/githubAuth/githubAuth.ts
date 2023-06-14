import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { getData, createNewUserData } from '@api-helpers/api-helpers';
import UserState from '@/App/services/MobX/store/UserState';

export async function githubAuth() {
  try {
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    const { user } = await signInWithPopup(auth, provider);
    const userName: string = user.displayName ? user.displayName : 'unknownUser';
    const userEmail: string = user.email ? user.email : 'unknownEmail';
    const isUserExists = await getData(user.uid, 'username');
    if (isUserExists === null) {
      await createNewUserData(userEmail, userName, user.uid);
      UserState.setStateUser(userEmail, userName, user.uid);
    } else {
      UserState.setStateUser(userEmail, isUserExists, user.uid);
    }
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
