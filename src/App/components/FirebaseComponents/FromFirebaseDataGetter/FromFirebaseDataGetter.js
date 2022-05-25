import { getDatabase, ref, get } from 'firebase/database';

export async function FromFirebaseDataGetter(userId, dataSection) {
  const firebaseDataBase = getDatabase();
  const firebaseDataBaseReference = ref(firebaseDataBase, 'users/' + userId + '/' + dataSection);
  let firebaseData;
  try {
    const snapshotData = await get(firebaseDataBaseReference);
    firebaseData = snapshotData.val();
    return firebaseData;
  } catch (error) {
    
  }
}
