import React, { useState } from 'react';
import { loadSomeFacts } from '@components/loadSomeFacts/loadSomeFacts';
import { removeDataFromFirebase } from '@components/firebaseFunctions/removeDataFromFirebase/removeDataFromFirebase';

import { getDatabase, ref, onValue } from 'firebase/database';

export function FavoriteFactsComponent({ userId }) {
  const [favoriteFactsLayout, setFavoriteFactsLayout] = useState('');
  const onFavoriteFactsButtonClick = async () => {
    const firebaseDataBase = getDatabase();
    const firebaseDataBaseReference = ref(
      firebaseDataBase,
      'users/' + userId + '/' + 'favoriteFacts',
    );
    onValue(firebaseDataBaseReference, (snapshot) => {
      const snapshotDataFromFirebase = snapshot.val();
      transformDataToLayout(snapshotDataFromFirebase);
    });
    async function transformDataToLayout(favoriteDataObject) {
      const favoriteFactsCollection = [];
      for (const favoriteId in favoriteDataObject) {
        const [receivedFactObject] = await loadSomeFacts('', favoriteDataObject[favoriteId]);
        favoriteFactsCollection.push(
          <div className='factsBox' key={favoriteId}>
            {receivedFactObject.text}
            {
              <button
                className='btn'
                onClick={() => removeDataFromFirebase(userId, 'favoriteFacts', favoriteId)}
              >
                delete
              </button>
            }
          </div>,
        );
      }
      setFavoriteFactsLayout(favoriteFactsCollection);
    }
  };

  return !favoriteFactsLayout ? (
    <button className='btn' onClick={() => onFavoriteFactsButtonClick()}>
      Favorite Facts
    </button>
  ) : (
    <div>
      <button className='btn' onClick={() => setFavoriteFactsLayout('')}>
        Hide Favorite Facts
      </button>
      {favoriteFactsLayout}
    </div>
  );
}
