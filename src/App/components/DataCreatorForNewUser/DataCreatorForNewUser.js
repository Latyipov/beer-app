import { getDatabase, ref, set } from 'firebase/database';

export async function DataCreatorForNewUser(userId, userEmail) {
  const db = getDatabase();

  set(ref(db, 'users/' + userId), {
    username: userEmail,
    email: userEmail,
    favoriteFacts: '',
  });
}
