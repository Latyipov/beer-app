import React, { useState, useEffect } from 'react';
import { TableItem } from '@components/TableItem/TableItem';
import { listenData, stopListenData, getBeerData } from '@api-helpers/api-helpers';
import { TableList } from '@components/TableList/TableList';
import { Error } from '@components/Error/Error';
import { Loading } from '@/App/components/Loading/Loading';
import { AddToFavoriteButton } from '@components/AddToFavoriteButton/AddToFavoriteButton';
import { BeerItem } from '@/App/types/BeerItem';
import UserState from '@/App/services/MobX/store/UserState';
import '@components/RandomItem/RandomItem.scss';

export function RandomItem() {
  const userId = UserState.userStateData.id;
  const [randomItem, setRandomItem] = useState<BeerItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [favoriteData, setFavoriteData] = useState<{ [key: string]: BeerItem } | null>(null);

  useEffect(() => {
    !!userId && listenData(userId, 'favorite', setFavoriteData, setError, setLoading);
    refreshItem();
    return () => {
      setFavoriteData(null);
      !!userId && stopListenData(userId, 'favorite');
    };
  }, []);

  const refreshItem = (): undefined => {
    setLoading(true);
    getBeerData('beers/random')
      .then((response) => {
        if (!response.errorMessage && !!response.itemObject) {
          setRandomItem(response.itemObject);
        } else {
          setError(response.errorMessage);
        }
      })
      .finally(() => setLoading(false));

    return undefined;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className='random-item'>
      <button className='random-item__button' onClick={refreshItem}>
        Show one more random beer
      </button>
      {!!randomItem && (
        <TableList>
          {randomItem.map((itemObject) => (
            <TableItem key={itemObject.id} itemObject={itemObject}>
              <AddToFavoriteButton checkingData={favoriteData} itemObject={itemObject} />
            </TableItem>
          ))}
        </TableList>
      )}
    </div>
  );
}
