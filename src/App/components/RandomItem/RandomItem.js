import React, { useState, useEffect } from 'react';
import { TableItem } from '@components/TableItem/TableItem';
import { listenData, stopListenData, getBeerData } from '@api-helpers/api-helpers';
import { useAuthentication } from '@/App/Redux/hooks/use-auth';
import { TableList } from '@components/TableList/TableList';
import { Error } from '@components/Error/Error';
import { Loading } from '@components/Loading/Loading';
import { AddToFavoriteButton } from '@components/AddToFavoriteButton/AddToFavoriteButton';
import '@components/RandomItem/RandomItem.scss';

export function RandomItem() {
  const { userId } = useAuthentication();
  const [onRefreshButton, setOnRefreshButton] = useState(false);

  const [randomItem, setRandomItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [favoriteData, setFavoriteData] = useState(null);

  useEffect(() => {
    listenData(userId, 'favorite', setFavoriteData, setError, setLoading);
    return () => {
      setFavoriteData(null);
      stopListenData(userId, 'favorite');
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    getBeerData('beers/random', setRandomItem, setError, setLoading);
    return () => {
      setRandomItem(null);
    };
  }, [onRefreshButton]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className='random-item'>
      <button className='random-item__button' onClick={() => setOnRefreshButton(!onRefreshButton)}>
        Show one more random beer
      </button>
      <TableList>
        {!!randomItem &&
          randomItem.map((itemObject) => (
            <TableItem key={itemObject.id} itemObject={itemObject}>
              <AddToFavoriteButton checkingData={favoriteData} itemObject={itemObject} />
            </TableItem>
          ))}
      </TableList>
    </div>
  );
}
