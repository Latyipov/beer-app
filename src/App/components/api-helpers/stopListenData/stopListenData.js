import { getDatabase, ref, off } from 'firebase/database';

export async function stopListenData(userId, dataSection) {
  const firebaseDataBase = await getDatabase();
  const firebaseDataBaseReference = ref(firebaseDataBase, 'users/' + userId + '/' + dataSection);
  off(firebaseDataBaseReference);
}
