import React, { useState } from 'react';
import { loadSomeFacts } from '@components/loadSomeFacts/loadSomeFacts';
import { removeDataFromFirebase } from '@components/firebaseFunctions/removeDataFromFirebase/removeDataFromFirebase';
import { listenDataFromFirebase } from '@components/firebaseFunctions/listenDataFromFirebase/listenDataFromFirebase';
import { stopListenDataFromFirebase } from '@components/firebaseFunctions/stopListenDataFromFirebase/stopListenDataFromFirebase';

export function FavoriteFactsComponent({ userId }) {
  const [favoriteFactsLayout, setFavoriteFactsLayout] = useState('');
  const onFavoriteFactsButtonClick = async () => {
    listenDataFromFirebase(userId, 'favoriteFacts', transformDataToLayout);
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
    return stop;
  };
  const onHideFavoriteFactsButtonClick = () => {
    setFavoriteFactsLayout('');
    stopListenDataFromFirebase(userId, 'favoriteFacts');
  };

  return !favoriteFactsLayout ? (
    <button className='btn' onClick={() => onFavoriteFactsButtonClick()}>
      Favorite Facts
    </button>
  ) : (
    <div>
      <button className='btn' onClick={() => onHideFavoriteFactsButtonClick()}>
        Hide Favorite Facts
      </button>
      {favoriteFactsLayout}
    </div>
  );
}
