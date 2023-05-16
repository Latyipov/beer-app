import { getDatabase, ref, remove } from 'firebase/database';

export async function removeData(userId: string, dataSection: string, factId: string) {
  const firebaseDataBase = getDatabase();
  const firebaseDataBaseReference = ref(
    firebaseDataBase,
    'users/' + userId + '/' + dataSection + '/' + factId,
  );
  try {
    await remove(firebaseDataBaseReference);
  } catch (error) {}
}
