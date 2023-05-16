import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { createNewUserData } from '@api-helpers/api-helpers';
import { UserCredentials } from '@/App/types/UserCredentials';
import UserState from '@/App/services/MobX/store/UserState';

type SignUpParams = UserCredentials;

export async function signUp({ userName, email, password }: SignUpParams) {
  try {
    const { user } = await createUserWithEmailAndPassword(getAuth(), email, password);
    !!user.email && (await createNewUserData(user.email, userName, user.uid));
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
