import React, { useState } from 'react';
import { removeDataFromFirebase } from '@components/firebaseFunctions/removeDataFromFirebase/removeDataFromFirebase';
import { listenDataFromFirebase } from '@components/firebaseFunctions/listenDataFromFirebase/listenDataFromFirebase';
import { stopListenDataFromFirebase } from '@components/firebaseFunctions/stopListenDataFromFirebase/stopListenDataFromFirebase';
import { useAuthorization } from '@/App/Redux/hooks/use-auth';
import { Item } from '../Item/Item';

export function FavoriteItems() {
  const { userId } = useAuthorization();
  const [favoriteListData, setFavoriteListData] = useState('');
  const onShowFavoriteListButtonClick = async () => {
    listenDataFromFirebase(userId, 'favorite', getData);
    async function getData(favoriteListDataObject) {
      setFavoriteListData(favoriteListDataObject);
    }
  };
  const onHideFavoriteFactsButtonClick = () => {
    setFavoriteListData('');
    stopListenDataFromFirebase(userId, 'favorite');
  };

  return !favoriteListData ? (
    <button className='btn' onClick={onShowFavoriteListButtonClick}>
      My favorite beer list
    </button>
  ) : (
    <div>
      <button className='btn' onClick={() => onHideFavoriteFactsButtonClick()}>
        Hide favorite beer list
      </button>
      {Object.keys(favoriteListData).map((dataID) => (
        <Item
          key={dataID}
          itemName={favoriteListData[dataID].name}
          itemId={favoriteListData[dataID].id}
          itemDescription={favoriteListData[dataID].itemDescription}
          itemImgUrl={favoriteListData[dataID].image_url}
          actionItemButton={
            <button
              className='btn'
              onClick={() => removeDataFromFirebase(userId, 'favorite', dataID)}
            >
              delete
            </button>
          }
        />
      ))}
    </div>
  );
}
