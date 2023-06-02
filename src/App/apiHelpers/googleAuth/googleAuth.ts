import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getData, createNewUserData } from '@api-helpers/api-helpers';
import { UserCredentials } from '@/App/types/UserCredentials';
import UserState from '@/App/services/MobX/store/UserState';

export async function GoogleAuth() {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const singInResult = await signInWithPopup(auth, provider);
    const credential: any = await GoogleAuthProvider.credentialFromResult(singInResult);
    // const uid: any = credential.accessToken;
    const user = singInResult.user;
    console.log(user, user.uid);
    const isUserExists = await getData(user.uid, 'username');
    console.log(isUserExists);
    if (isUserExists === null) {
      !!user.email &&
        !!user.displayName &&
        (await createNewUserData(user.email, user.displayName, user.uid));
      !!user.email &&
        !!user.displayName &&
        UserState.setStateUser(user.email, user.displayName, user.uid);
    } else {
      !!user.email && UserState.setStateUser(user.email, isUserExists, user.uid);
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
