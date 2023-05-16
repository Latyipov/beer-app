import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push } from 'firebase/database';
import { getData } from '@api-helpers/api-helpers';
import { BeerItem } from '@/App/types/BeerItem';

export async function pushData(userId: string, dataSection: string, itemData: BeerItem) {
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
