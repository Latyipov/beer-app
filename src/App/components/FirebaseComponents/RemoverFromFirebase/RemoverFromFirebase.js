import { getDatabase, ref, remove } from 'firebase/database';

export async function RemoverFromFirebase(userId, dataSection, factId) {
  const firebaseDataBase = getDatabase();
  const firebaseDataBaseReference = ref(firebaseDataBase, 'users/' + userId + '/' + dataSection + '/' + factId);
  try {
    await remove(firebaseDataBaseReference);
  } catch (error) {}
}
