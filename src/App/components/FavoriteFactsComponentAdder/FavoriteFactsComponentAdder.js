import React, { useState } from 'react';
import { FactsLoader } from '../FactsLoader/FactsLoader';
import { RemoverFromFirebase } from '@components/firebaseFunctions/RemoverFromFirebase/RemoverFromFirebase';

import { getDatabase, ref, onValue } from 'firebase/database';

export function FavoriteFactsComponentAdder({ userId }) {
  const [factsLayout, setFactsLayout] = useState('');
  const onFavoriteButtonClick = async () => {
    const firebaseDataBase = getDatabase();
    const firebaseDataBaseReference = ref(
      firebaseDataBase,
      'users/' + userId + '/' + 'favoriteFacts',
    );
    onValue(firebaseDataBaseReference, (snapshot) => {
      const snapshotData = snapshot.val();
      addFactsToLayout(snapshotData);
    });
    async function addFactsToLayout(favoriteDataObject) {
      const favoriteFactsCollection = [];
      for (const favoriteId in favoriteDataObject) {
        const [receivedFactObject] = await FactsLoader('', favoriteDataObject[favoriteId]);
        favoriteFactsCollection.push(
          <div className='factsBox' key={favoriteId}>
            {receivedFactObject.text}
            {
              <button
                className='btn'
                onClick={() => RemoverFromFirebase(userId, 'favoriteFacts', favoriteId)}
              >
                delete
              </button>
            }
          </div>,
        );
      }
      setFactsLayout(favoriteFactsCollection);
    }
  };

  return !factsLayout ? (
    <button className='btn' onClick={() => onFavoriteButtonClick()}>
      Favorite Facts
    </button>
  ) : (
    <div>
      <button className='btn' onClick={() => setFactsLayout('')}>
        Hide Favorite Facts
      </button>
      {factsLayout}
    </div>
  );
}
