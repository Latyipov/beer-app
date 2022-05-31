import { getDatabase, ref, onValue } from 'firebase/database';

export async function listenDataFromFirebase(userId, dataSection, transformDataFunction) {
  const firebaseDataBase = getDatabase();
  const firebaseDataBaseReference = ref(firebaseDataBase, 'users/' + userId + '/' + dataSection);
  onValue(firebaseDataBaseReference, (snapshot) => {
    const snapshotDataFromFirebase = snapshot.val();
    transformDataFunction(snapshotDataFromFirebase);
  });
}
