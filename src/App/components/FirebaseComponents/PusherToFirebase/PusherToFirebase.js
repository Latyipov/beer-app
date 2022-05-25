import { getDatabase, ref, push } from 'firebase/database';
import { FromFirebaseDataGetter } from '../FromFirebaseDataGetter/FromFirebaseDataGetter';

export async function PusherToFirebase(userId, dataSection, factId) {
  const firebaseDataBase = getDatabase();
  const firebaseDataBaseReference = ref(firebaseDataBase, 'users/' + userId + '/' + dataSection);
  const receivedFirebaseData = await FromFirebaseDataGetter(userId, dataSection);
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
