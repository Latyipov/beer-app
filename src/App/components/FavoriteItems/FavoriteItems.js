import React, { useState, useEffect } from 'react';
import { removeDataFromFirebase } from '@components/firebaseFunctions/removeDataFromFirebase/removeDataFromFirebase';
import { listenDataFromFirebase } from '@components/firebaseFunctions/listenDataFromFirebase/listenDataFromFirebase';
import { stopListenDataFromFirebase } from '@components/firebaseFunctions/stopListenDataFromFirebase/stopListenDataFromFirebase';
import { useAuthentication } from '@/App/Redux/hooks/use-auth';
import { Item } from '../Item/Item';
import { TableList } from '@components/TableList/TableList';

import './FavoriteItems.scss';

export function FavoriteItems() {
  const { userId } = useAuthentication();
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

  const pushFavoriteButton = () => {
    setIsFavoriteButtonOn(!isFavoriteButtonOn);
  };

  return (
    <div className='favorite'>
      <button className='favorite__button' onClick={pushFavoriteButton}>
        {!isFavoriteButtonOn ? 'My favorite beer list' : 'Hide favorite beer list'}
      </button>
      {isFavoriteButtonOn && (
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
                  className='favorite__button'
                  onClick={() => removeDataFromFirebase(userId, 'favorite', dataID)}
                >
                  delete
                </button>
              }
            />
          ))}
        </TableList>
      )}
    </div>
  );
}
