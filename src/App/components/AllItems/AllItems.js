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
  const [isObserverAvtive, setIsObserverAvtive] = useState(true);

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
      setIsObserverAvtive(false);
    }
  }, [partData]);

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
              actionItemButton={
                <button
                  className='all-items__button'
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
      {smallLoading && <SmallLoading />}
      {isObserverAvtive && <LastElementObserver isElementIntersecting={isElementIntersecting} />}
    </div>
  );
}
