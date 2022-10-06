import React, { useState, useEffect } from 'react';
import { removeDataFromFirebase } from '@components/firebaseFunctions/removeDataFromFirebase/removeDataFromFirebase';
import { listenDataFromFirebase } from '@components/firebaseFunctions/listenDataFromFirebase/listenDataFromFirebase';
import { stopListenDataFromFirebase } from '@components/firebaseFunctions/stopListenDataFromFirebase/stopListenDataFromFirebase';
import { useAuthorization } from '@/App/Redux/hooks/use-auth';
import { Item } from '../Item/Item';
import { TableList } from '@components/TableList/TableList';

export function FavoriteItems() {
  const { userId } = useAuthorization();
  const [favoriteListData, setFavoriteListData] = useState('');
  const [isFavoriteButtonOn, setIsFavoriteButtonOn] = useState(false);

  useEffect(() => {
    if (isFavoriteButtonOn) {
      listenDataFromFirebase(userId, 'favorite', getData);
      async function getData(favoriteListDataObject) {
        setFavoriteListData(favoriteListDataObject);
      }
      return () => {
        setFavoriteListData('');
        stopListenDataFromFirebase(userId, 'favorite');
      };
    }
  }, [isFavoriteButtonOn]);

  return !isFavoriteButtonOn ? (
    <button className='btn' onClick={() => setIsFavoriteButtonOn(true)}>
      My favorite beer list
    </button>
  ) : (
    <div>
      <button className='btn' onClick={() => setIsFavoriteButtonOn(false)}>
        Hide favorite beer list
      </button>
      <TableList>
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
      </TableList>
    </div>
  );
}
