import { getDatabase, ref, remove } from 'firebase/database';

export async function RemoverFromFirebase(userId, dataSection, factIdForRemove) {
  const db = getDatabase();
  const dbRef = ref(db, 'users/' + userId + '/' + dataSection + '/' + factIdForRemove);
  try {
    await remove(dbRef);
  } catch (error) {
    console.log(error);
  }
}
