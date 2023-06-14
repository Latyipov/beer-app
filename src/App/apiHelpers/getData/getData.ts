import { getDatabase, ref, get } from 'firebase/database';

export async function getData(userId: string, dataSection: string) {
  const firebaseDataBase = getDatabase();
  const firebaseDataBaseReference = ref(firebaseDataBase, 'users/' + userId + '/' + dataSection);
  try {
    const snapshotData = await get(firebaseDataBaseReference);
    return snapshotData.val();
  } catch (error) {
    return error;
  }
}
