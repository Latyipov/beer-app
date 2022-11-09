import React, { useState, useEffect } from 'react';
import { requestAPI } from '@/App/components/requestAPI/requestAPI';
import { TableItem } from '@components/TableItem/TableItem';
import { pushDataToFirebase } from '@components/firebaseFunctions/pushDataToFirebase/pushDataToFirebase';
import { useAuthentication } from '@/App/Redux/hooks/use-auth';
import { TableList } from '@components/TableList/TableList';
import { Error } from '@components/Error/Error';
import { Loading } from '@components/Loading/Loading';
import { listenDataFromFirebase } from '@components/firebaseFunctions/listenDataFromFirebase/listenDataFromFirebase';
import { stopListenDataFromFirebase } from '@components/firebaseFunctions/stopListenDataFromFirebase/stopListenDataFromFirebase';

import '@components/RandomItem/RandomItem.scss';

export function RandomItem() {
  const { userId } = useAuthentication();
  const [onRefreshButton, setOnRefreshButton] = useState(false);

  const [randomItem, setRandomItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [favoriteListData, setFavoriteListData] = useState(null);

  useEffect(() => {
    listenDataFromFirebase(userId, 'favorite', setFavoriteListData, setError, setLoading);
    return () => {
      setFavoriteListData(null);
      stopListenDataFromFirebase(userId, 'favorite');
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    requestAPI('beers/random', setRandomItem, setError, setLoading);
    return () => {
      setRandomItem(null);
    };
  }, [onRefreshButton]);

  const buttonSwitcher = (id, name, description, imageUrl) => {
    const isInFavorite =
      favoriteListData && Object.values(favoriteListData).some((val) => val.id === id);

    return isInFavorite ? (
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
    </div>
  );
}
