import { getDatabase, ref, push } from 'firebase/database';
import { FromFirebaseDataGetter } from '../FromFirebaseDataGetter/FromFirebaseDataGetter';

export async function PusherToFirebase(userId, dataSection, factId) {
  const db = getDatabase();
  const dbRef = ref(db, 'users/' + userId + '/' + dataSection);
  const gettedData = await FromFirebaseDataGetter(userId, dataSection);
  let factNotRepeat = true;
  for (const favoriteFactId in gettedData) {
    if (gettedData[favoriteFactId] === factId) {
      factNotRepeat = false;
    }
  }
  if (factNotRepeat) {
    push(dbRef, factId);
  }
}
