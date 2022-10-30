import React, { useState, useEffect } from 'react';
import { removeDataFromFirebase } from '@components/firebaseFunctions/removeDataFromFirebase/removeDataFromFirebase';
import { listenDataFromFirebase } from '@components/firebaseFunctions/listenDataFromFirebase/listenDataFromFirebase';
import { stopListenDataFromFirebase } from '@components/firebaseFunctions/stopListenDataFromFirebase/stopListenDataFromFirebase';
import { useAuthentication } from '@/App/Redux/hooks/use-auth';
import { TableItem } from '../TableItem/TableItem';
import { TableList } from '@components/TableList/TableList';
import { Loading } from '@components/Loading/Loading';
import { Error } from '@components/Error/Error';

import './FavoriteItems.scss';

export function FavoriteItems() {
  const { userId } = useAuthentication();
  const [favoriteListData, setFavoriteListData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listenDataFromFirebase(userId, 'favorite', setFavoriteListData, setError, setLoading);
    return () => {
      setFavoriteListData(null);
      stopListenDataFromFirebase(userId, 'favorite');
    };
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className='favorite'>
      <TableList>
        {favoriteListData &&
          Object.entries(favoriteListData).map(([id, value]) => (
            <TableItem
              key={id}
              itemName={value.name}
              itemId={value.id}
              itemDescription={value.itemDescription}
              itemImgUrl={value.image_url}
              actionItemButton={
                <button
                  className='favorites__button'
                  onClick={() => removeDataFromFirebase(userId, 'favorite', id)}
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
