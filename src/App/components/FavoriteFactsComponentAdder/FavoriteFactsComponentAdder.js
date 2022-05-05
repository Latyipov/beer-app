import React, { useState } from 'react';
import { FactsLoader } from '../FactsLoader/FactsLoader';
import { RemoverFromFirebase } from '../FirebaseComponents/RemoverFromFirebase/RemoverFromFirebase';

import { getDatabase, ref, onValue } from 'firebase/database';

export function FavoriteFactsComponentAdder({ userId }) {
  const [FavotiteFacts, setFavotiteFacts] = useState('');
  const onFavoriteButtonClick = async () => {
    const db = getDatabase();
    const dbRef = ref(db, 'users/' + userId + '/' + 'favoriteFacts');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      favoriteFactsLayout(data);
    });
    async function favoriteFactsLayout(data) {
      const downloadedFavoriteFacts = [];
      for (const favoriteFactId in data) {
        const [factObject] = await FactsLoader('', data[favoriteFactId]);
        downloadedFavoriteFacts.push(
          <div className='factsBox' key={favoriteFactId}>
            {factObject.text}
            {
              <button
                className='btn'
                onClick={() => RemoverFromFirebase(userId, 'favoriteFacts', favoriteFactId)}
              >
                delete
              </button>
            }
          </div>,
        );
      }
      setFavotiteFacts(downloadedFavoriteFacts);
    }
  };

  return !FavotiteFacts ? (
    <button className='btn' onClick={() => onFavoriteButtonClick()}>
      Favorite Facts
    </button>
  ) : (
    <div>
      <button className='btn' onClick={() => setFavotiteFacts('')}>
        Hide Favorite Facts
      </button>
      {FavotiteFacts}
    </div>
  );
}
