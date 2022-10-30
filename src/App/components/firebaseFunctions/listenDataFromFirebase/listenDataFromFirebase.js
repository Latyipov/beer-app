import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

export async function listenDataFromFirebase(userId, dataSection, onSuccess, onError, onLoading) {
  try {
    await getAuth();
    const firebaseDataBase = await getDatabase();
    const firebaseDataBaseReference = ref(firebaseDataBase, 'users/' + userId + '/' + dataSection);
    await onValue(firebaseDataBaseReference, (snapshot) => {
      onLoading(false);
      const snapshotDataFromFirebase = snapshot.val();
      onSuccess(snapshotDataFromFirebase);
    });
    return undefined;
  } catch (error) {
    onLoading(false);
    onError(error);
  }
}
