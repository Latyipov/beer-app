import { getDatabase, ref, get } from 'firebase/database';

export async function getData(userId: string, dataSection: string) {
  const firebaseDataBase = getDatabase();
  const firebaseDataBaseReference = ref(firebaseDataBase, 'users/' + userId + '/' + dataSection);
  let firebaseData;
  try {
    const snapshotData = await get(firebaseDataBaseReference);
    firebaseData = snapshotData.val();
    return firebaseData;
  } catch (error) {
    return error;
  }
}
