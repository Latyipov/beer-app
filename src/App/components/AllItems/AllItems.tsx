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
  const currentItem = useRef<number>(0);
  const [data, setData] = useState<BeerItem[] | null>(null);
  const [chunkData, setСhunkData] = useState<BeerItem[] | undefined>(undefined);
  const [collectedData, setCollectedData] = useState<BeerItem[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [smallLoading, setSmallLoading] = useState<boolean>(false);
  const [isObserverActive, setIsObserverActive] = useState<boolean>(false);
  const [favoriteData, setFavoriteData] = useState<{ [id: string]: BeerItem } | null>(null);

  const setNextPageData = () => {
    setSmallLoading(true);
    setIsObserverActive(false);
    setСhunkData(data?.slice(currentItem.current, currentItem.current + portions));
    currentItem.current = currentItem.current + portions;
  };

  useEffect(() => {
    setSmallLoading(true);
    getBeerData(`ale`)
      .then((apiResponse) => {
        if (!apiResponse.errorMessage && !!apiResponse.itemObject) {
          setData(apiResponse.itemObject);
          setIsObserverActive(true);
        } else {
          setError(apiResponse.errorMessage);
        }
      })
      .finally(() => setLoading(false));
    !!userId && listenData(userId, 'favorite', setFavoriteData, setError, setLoading);
    return () => {
      setFavoriteData(null);
      !!userId && stopListenData(userId, 'favorite');
    };
  }, []);

  useEffect(() => {
    if (chunkData) {
      setCollectedData([...collectedData, ...chunkData]);
      setIsObserverActive(true);
    }
    if (Array.isArray(chunkData) && chunkData.length === 0) {
      setSmallLoading(false);
      setIsObserverActive(false);
    }
  }, [chunkData]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className='all-items'>
      <TableList>
        {!!collectedData &&
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
