import React, { useState, useEffect } from 'react';
import { requestAPI } from '@/App/components/requestAPI/requestAPI';
import { TableItem } from '@components/TableItem/TableItem';
import { pushDataToFirebase } from '@components/firebaseFunctions/pushDataToFirebase/pushDataToFirebase';
import { useAuthentication } from '@/App/Redux/hooks/use-auth';
import { TableList } from '@components/TableList/TableList';
import { Error } from '@components/Error/Error';
import { Loading } from '@components/Loading/Loading';

import '@components/RandomItem/RandomItem.scss';

export function RandomItem() {
  const { userId } = useAuthentication();
  const [onRefreshButton, setOnRefreshButton] = useState(false);

  const [randomItem, setRandomItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    requestAPI('beers/random', setRandomItem, setError, setLoading);
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
            <TableItem
              key={itemObject.id}
              itemName={itemObject.name}
              itemId={itemObject.id}
              itemDescription={itemObject.description}
              itemImgUrl={itemObject.image_url}
              actionItemButton={
                <button
                  className='table__button'
                  onClick={() =>
                    pushDataToFirebase(userId, 'favorite', {
                      id: itemObject.id,
                      name: itemObject.name,
                      itemDescription: itemObject.description,
                      image_url: itemObject.image_url,
                    })
                  }
                >
                  add to favorite
                </button>
              }
            />
          ))}
      </TableList>
    </div>
  );
}
