import { getDatabase, ref, get } from "firebase/database";


export async function FromFirebaseDataGetter(userId, dataSection) {
  const db = getDatabase();
  const dbRef = ref(db, 'users/' + userId + '/' + dataSection);
  let gettedData;
try{
  let snapshot = await get(dbRef);
  gettedData = snapshot.val();
  return gettedData;
}
  catch(error){
    console.error(error);
  }
}
