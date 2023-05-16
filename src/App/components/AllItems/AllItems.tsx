import React, { useState, useEffect, useRef } from 'react';
import { TableItem } from '@/App/components/TableItem/TableItem';
import { listenData, stopListenData, getBeerData } from '@api-helpers/api-helpers';
import { TableList } from '@components/TableList/TableList';
import { Error } from '@components/Error/Error';
import { Loading } from '@components/Loading/Loading';
import { SmallLoading } from '@components/SmallLoading/SmallLoading';
import { LastElementObserver } from '@/App/components/LastElementObserver/LastElementObserver';
import { AddToFavoriteButton } from '@components/AddToFavoriteButton/AddToFavoriteButton';
import { BeerItem } from '@/App/types/BeerItem';
import UserState from '@/App/services/MobX/store/UserState';

import './AllItems.scss';

export function AllItems() {
  const userId = UserState.userStateData.id;
  const portions = 10;
  const currentAPIPage = useRef<number>(1);
  const [chunkData, setСhunkData] = useState<BeerItem[] | null>(null);
  const [collectedData, setCollectedData] = useState<BeerItem[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [smallLoading, setSmallLoading] = useState<boolean>(true);
  const [isObserverActive, setIsObserverActive] = useState<boolean>(true);
  const [favoriteData, setFavoriteData] = useState<{ [id: string]: BeerItem } | null>(null);

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
    !!userId && listenData(userId, 'favorite', setFavoriteData, setError, setLoading);
    return () => {
      setFavoriteData(null);
      !!userId && stopListenData(userId, 'favorite');
    };
  }, []);

  const setNextPageData = async () => {
    setSmallLoading(true);
    const apiResponse = await getBeerData(
      `beers?page=${currentAPIPage.current}&per_page=${portions}`,
    );
    if (!apiResponse.errorMessage && !!apiResponse.itemObject) {
      setСhunkData(apiResponse.itemObject);
    } else {
      setError(apiResponse.errorMessage);
    }
    setSmallLoading(false);
    currentAPIPage.current++;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
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
