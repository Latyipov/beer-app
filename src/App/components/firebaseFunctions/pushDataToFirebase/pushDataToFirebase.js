import { getDatabase, ref, push } from 'firebase/database';
import { getDataFromFirebase } from '@components/firebaseFunctions/getDataFromFirebase/getDataFromFirebase';

export async function pushDataToFirebase(userId, dataSection, factId) {
  const firebaseDataBase = getDatabase();
  const firebaseDataBaseReference = ref(firebaseDataBase, 'users/' + userId + '/' + dataSection);
  const receivedFirebaseData = await getDataFromFirebase(userId, dataSection);
  let factNotRepeat = true;
  for (const firebaseFactId in receivedFirebaseData) {
    if (receivedFirebaseData[firebaseFactId] === factId) {
      factNotRepeat = false;
    }
  }
  if (factNotRepeat) {
    push(firebaseDataBaseReference, factId);
  }
}
