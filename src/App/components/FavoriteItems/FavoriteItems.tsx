import React, { useState, useEffect } from 'react';
import { removeData, listenData, stopListenData } from '@api-helpers/api-helpers';
import { TableItem } from '../TableItem/TableItem';
import { TableList } from '@components/TableList/TableList';
import { Loading } from '@/App/components/Loading/Loading';
import { Error } from '@components/Error/Error';
import UserState from '@/App/services/MobX/store/UserState';
import { BeerItem } from '@/App/types/BeerItem';
import EmptyMug from '@/App/images/empty-mug.png';

import './FavoriteItems.scss';

export function FavoriteItems() {
  const userId = UserState.userStateData.id;
  const [favoriteData, setFavoriteData] = useState<{ [id: string]: BeerItem } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    !!userId && listenData(userId, 'favorite', setFavoriteData, setError, setLoading);
    return () => {
      setFavoriteData(null);
      !!userId && stopListenData(userId, 'favorite');
    };
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className='favorite-item'>
      {favoriteData && (
        <TableList>
          {Object.entries(favoriteData).map(([id, value]) => (
            <TableItem key={id} itemObject={value}>
              <button
                className='table__button'
                onClick={() => !!userId && removeData(userId, 'favorite', id)}
              >
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
