import { getDatabase, ref, set } from 'firebase/database';

export async function createNewUserData(userEmail: string, userName: string, userId: string) {
  const firebaseDataBase = getDatabase();
  const firebaseDataBaseReference = ref(firebaseDataBase, 'users/' + userId);

  set(firebaseDataBaseReference, {
    username: userName,
    email: userEmail,
    favorite: '',
  });
}
