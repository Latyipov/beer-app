import React, { useState, useEffect, useRef } from 'react';
import { TableItem } from '@/App/components/TableItem/TableItem';
import { listenData, stopListenData, getBeerData } from '@api-helpers/api-helpers';
import { TableList } from '@components/TableList/TableList';
import { useAuthentication } from '@/App/Redux/hooks/use-auth';
import { Error } from '@components/Error/Error';
import { Loading } from '@components/Loading/Loading';
import { SmallLoading } from '@components/SmallLoading/SmallLoading';
import { LastElementObserver } from '@/App/components/LastElementObserver/LastElementObserver';
import { AddToFavoriteButton } from '@components/AddToFavoriteButton/AddToFavoriteButton';

import './AllItems.scss';

export function AllItems() {
  const { userId } = useAuthentication();
  const portions = 10;
  const currentAPIPage = useRef(1);
  const [chunkData, setСhunkData] = useState(null);
  const [collectedData, setCollectedData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [smallLoading, setSmallLoading] = useState(true);
  const [isObserverActive, setIsObserverActive] = useState(true);
  const [favoriteData, setFavoriteData] = useState(null);

  useEffect(() => {
    if (chunkData) {
      setSmallLoading(false);
      setCollectedData([...collectedData, ...chunkData]);
    }
    if (Array.isArray(chunkData) && chunkData.length === 0) {
      setIsObserverActive(false);
    }
  }, [chunkData]);

  useEffect(() => {
    listenData(userId, 'favorite', setFavoriteData, setError, setLoading);
    return () => {
      setFavoriteData(null);
      stopListenData(userId, 'favorite');
    };
  }, []);

  const setNextPageData = () => {
    setSmallLoading(true);
    getBeerData(
      `beers?page=${currentAPIPage.current}&per_page=${portions}`,
      setСhunkData,
      setError,
      setLoading,
    );
    currentAPIPage.current++;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className='all-items'>
      <TableList>
        {collectedData &&
          collectedData.map((itemObject) => (
            <TableItem key={itemObject.id} itemObject={itemObject}>
              <AddToFavoriteButton checkingData={favoriteData} itemObject={itemObject} />
            </TableItem>
          ))}
      </TableList>
      {smallLoading && <SmallLoading />}
      {isObserverActive && <LastElementObserver setNextPageData={setNextPageData} />}
    </div>
  );
}
