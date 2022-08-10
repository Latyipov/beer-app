import { getDatabase, ref, set } from 'firebase/database';

export async function createDataForNewUser(userId, userEmail) {
  const firebaseDataBase = getDatabase();
  const firebaseDataBaseReference = ref(firebaseDataBase, 'users/' + userId);

  set(firebaseDataBaseReference, {
    username: userEmail,
    email: userEmail,
    favorite: '',
  });
}
