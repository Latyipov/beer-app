import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push } from 'firebase/database';
import { getData } from '@api-helpers/api-helpers';

export async function pushData(userId, dataSection, itemData) {
  getAuth();
  const firebaseDataBase = getDatabase();
  const firebaseDataBaseReference = ref(firebaseDataBase, 'users/' + userId + '/' + dataSection);
  const receivedFirebaseData = await getData(userId, dataSection);
  let notRepeated = true;
  for (const favoriteData in receivedFirebaseData) {
    if (receivedFirebaseData[favoriteData].id === itemData.id) {
      notRepeated = false;
    }
  }
  if (notRepeated) {
    push(firebaseDataBaseReference, itemData);
  }
}
