import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

export function listenDataFromFirebase(userId, dataSection, processingDataFunction) {
  getAuth();
  const firebaseDataBase = getDatabase();
  const firebaseDataBaseReference = ref(firebaseDataBase, 'users/' + userId + '/' + dataSection);
  onValue(firebaseDataBaseReference, (snapshot) => {
    const snapshotDataFromFirebase = snapshot.val();
    processingDataFunction(snapshotDataFromFirebase);
  });
}
