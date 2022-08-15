import { getDatabase, ref, set } from 'firebase/database';

export async function createDataForNewUser(userId, userEmail, userName) {
  const firebaseDataBase = getDatabase();
  const firebaseDataBaseReference = ref(firebaseDataBase, 'users/' + userId);

  set(firebaseDataBaseReference, {
    username: userName,
    email: userEmail,
    favorite: '',
  });
}
