import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push } from 'firebase/database';
import { getDataFromFirebase } from '@components/firebaseFunctions/getDataFromFirebase/getDataFromFirebase';

export async function pushDataToFirebase(userId, dataSection, itemData) {
  getAuth();
  const firebaseDataBase = getDatabase();
  const firebaseDataBaseReference = ref(firebaseDataBase, 'users/' + userId + '/' + dataSection);
  const receivedFirebaseData = await getDataFromFirebase(userId, dataSection);
  let factNotRepeat = true;
  for (const favoriteData in receivedFirebaseData) {
    if (receivedFirebaseData[favoriteData].id === itemData.id) {
      factNotRepeat = false;
    }
  }
  if (factNotRepeat) {
    push(firebaseDataBaseReference, itemData);
  }
}
