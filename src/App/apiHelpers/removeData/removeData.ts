import { getDatabase, ref, remove } from 'firebase/database';

export async function removeData(userId: string, dataSection: string, factId: string) {
  try {
    const firebaseDataBase = getDatabase();
    const firebaseDataBaseReference = ref(
      firebaseDataBase,
      'users/' + userId + '/' + dataSection + '/' + factId,
    );
    await remove(firebaseDataBaseReference);
  } catch (error) {}
}
