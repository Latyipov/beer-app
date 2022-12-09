import { getDatabase, ref, set } from 'firebase/database';

export async function createNewUser(userId, userEmail, userName) {
  const firebaseDataBase = getDatabase();
  const firebaseDataBaseReference = ref(firebaseDataBase, 'users/' + userId);

  set(firebaseDataBaseReference, {
    username: userName,
    email: userEmail,
    favorite: '',
  });
}
