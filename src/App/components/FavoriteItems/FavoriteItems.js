import React, { useState, useEffect } from 'react';
import { removeData, listenData, stopListenData } from '@api-helpers/api-helpers';
import { useAuthentication } from '@/App/Redux/hooks/use-auth';
import { TableItem } from '../TableItem/TableItem';
import { TableList } from '@components/TableList/TableList';
import { Loading } from '@components/Loading/Loading';
import { Error } from '@components/Error/Error';
import EmptyMug from '@/App/images/empty-mug.png';

import './FavoriteItems.scss';

export function FavoriteItems() {
  const { userId } = useAuthentication();
  const [favoriteData, setFavoriteData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listenData(userId, 'favorite', setFavoriteData, setError, setLoading);
    return () => {
      setFavoriteData(null);
      stopListenData(userId, 'favorite');
    };
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className='favorite-item'>
      {favoriteData && (
        <TableList>
          {Object.entries(favoriteData).map(([id, value]) => (
            <TableItem key={id} itemObject={value}>
              <button className='table__button' onClick={() => removeData(userId, 'favorite', id)}>
                delete
              </button>
            </TableItem>
          ))}
        </TableList>
      )}
      {!favoriteData && (
        <div className='favorite-item__empty'>
          <img src={EmptyMug} alt='empty-mug' className='favorite-item__empty-image' />
          <p className='favorite-item__empty-message'>
            No favorite drinks yet. Do you want to add one?
          </p>
        </div>
      )}
    </div>
  );
}
