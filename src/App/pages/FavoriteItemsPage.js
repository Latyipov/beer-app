import React, { useState, useEffect } from 'react';
import { Item } from '@components/Item/Item';
import { TableList } from '@components/TableList/TableList';
import { useAuthentication } from '@/App/Redux/hooks/use-auth';
import { Header } from '@components/Header/Header';
import { removeDataFromFirebase } from '@components/firebaseFunctions/removeDataFromFirebase/removeDataFromFirebase';
import { listenDataFromFirebase } from '@components/firebaseFunctions/listenDataFromFirebase/listenDataFromFirebase';
import { stopListenDataFromFirebase } from '@components/firebaseFunctions/stopListenDataFromFirebase/stopListenDataFromFirebase';
import './FavoriteItemsPage.scss';

export function FavoriteItemsPage() {
  const { userId } = useAuthentication();
  const [favoriteListData, setFavoriteListData] = useState('');

  useEffect(() => {
    listenDataFromFirebase(userId, 'favorite', getData);
    async function getData(favoriteListDataObject) {
      setFavoriteListData(favoriteListDataObject);
    }
    return () => {
      setFavoriteListData('');
      stopListenDataFromFirebase(userId, 'favorite');
    };
  }, []);

  return (
    <div className='favorites'>
      <Header />
      <main className='favorites__body'>
        <h1 className='favorites__title'>Favorite Beer</h1>
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
                  className='favorites__button'
                  onClick={() => removeDataFromFirebase(userId, 'favorite', dataID)}
                >
                  delete
                </button>
              }
            />
          ))}
        </TableList>
      </main>
    </div>
  );
}
