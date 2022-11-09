import React, { useState, useEffect } from 'react';
import { requestAPI } from '@/App/components/requestAPI/requestAPI';
import { TableItem } from '@/App/components/TableItem/TableItem';
import { pushDataToFirebase } from '@components/firebaseFunctions/pushDataToFirebase/pushDataToFirebase';
import { TableList } from '@components/TableList/TableList';
import { useAuthentication } from '@/App/Redux/hooks/use-auth';
import { Error } from '@components/Error/Error';
import { Loading } from '@components/Loading/Loading';
import { SmallLoading } from '@components/SmallLoading/SmallLoading';
import { LastElementObserver } from '@/App/components/LastElementObserver/LastElementObserver';
import { listenDataFromFirebase } from '@components/firebaseFunctions/listenDataFromFirebase/listenDataFromFirebase';
import { stopListenDataFromFirebase } from '@components/firebaseFunctions/stopListenDataFromFirebase/stopListenDataFromFirebase';

import './AllItems.scss';

export function AllItems() {
  const { userId } = useAuthentication();
  const [partData, setPartData] = useState(null);
  const [listData, setListData] = useState([]);
  const portions = 10;
  const [currentAPIPage, setCurrentAPIPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [smallLoading, setSmallLoading] = useState(true);
  const [isObserverActive, setIsObserverActive] = useState(true);

  const [favoriteListData, setFavoriteListData] = useState(null);

  useEffect(() => {
    requestAPI(
      `beers?page=${currentAPIPage}&per_page=${portions}`,
      setPartData,
      setError,
      setLoading,
    );
  }, [currentAPIPage]);

  useEffect(() => {
    if (partData) {
      setSmallLoading(false);
      setListData([...listData, ...partData]);
    }
    if (Array.isArray(partData) && partData.length === 0) {
      setIsObserverActive(false);
    }
  }, [partData]);

  useEffect(() => {
    listenDataFromFirebase(userId, 'favorite', setFavoriteListData, setError, setLoading);

    return () => {
      setFavoriteListData(null);
      stopListenDataFromFirebase(userId, 'favorite');
    };
  }, []);

  const buttonSwitcher = (id, name, description, imageUrl) => {
    const isIdInFavorite =
      favoriteListData &&
      Object.values(favoriteListData).some((favoriteObject) => favoriteObject.id === id);

    return isIdInFavorite ? (
      <button className='table__button' disabled={true}>
        in favorite
      </button>
    ) : (
      <button
        className='table__button'
        onClick={() =>
          pushDataToFirebase(userId, 'favorite', {
            id: id,
            name: name,
            itemDescription: description,
            image_url: imageUrl,
          })
        }
      >
        add to favorite
      </button>
    );
  };

  const isElementIntersecting = () => {
    setSmallLoading(true);
    setCurrentAPIPage((prevValue) => prevValue + 1);
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
        {listData &&
          listData.map((itemObject) => (
            <TableItem
              key={itemObject.id}
              itemName={itemObject.name}
              itemId={itemObject.id}
              itemDescription={itemObject.description}
              itemImgUrl={itemObject.image_url}
              actionItemButton={buttonSwitcher(
                itemObject.id,
                itemObject.name,
                itemObject.description,
                itemObject.image_url,
              )}
            />
          ))}
      </TableList>
      {smallLoading && <SmallLoading />}
      {isObserverActive && <LastElementObserver isElementIntersecting={isElementIntersecting} />}
    </div>
  );
}
