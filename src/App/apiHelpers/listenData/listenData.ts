import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { BeerItem } from '@/App/types/BeerItem';

export async function listenData(
  userId: string,
  dataSection: string,
  onSuccess: (
    parameter: {
      [key: string]: BeerItem;
    } | null,
  ) => void,
  onError: (parameter: string | null) => void,
  onLoading: (parameter: boolean) => void,
) {
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      onLoading(false);
      onError(error.message);
      return undefined;
    }
    onLoading(false);
    onError('unexpected Error');
    return undefined;
  }
}
