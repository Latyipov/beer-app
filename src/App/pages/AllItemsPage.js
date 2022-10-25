import React, { useState, useEffect, useRef } from 'react';
import { sendApiRequest } from '@components/sendApiRequest/sendApiRequest';
import { Item } from '@components/Item/Item';
import { pushDataToFirebase } from '@components/firebaseFunctions/pushDataToFirebase/pushDataToFirebase';
import { TableList } from '@components/TableList/TableList';
import { useAuthentication } from '@/App/Redux/hooks/use-auth';
import { Header } from '@components/Header/Header';
import './AllItemsPage.scss';

export function AllItemsPage() {
  const { userId } = useAuthentication();
  const [itemsList, setItemsList] = useState([]);
  const [currentAPIPage, setCurrentAPIPage] = useState(0);
  const lastElement = useRef();
  const observer = useRef();

  useEffect(() => {
    if (currentAPIPage !== 0) {
      sendApiRequest(`beers?page=${currentAPIPage}&per_page=5`).then((response) => {
        if (response.length === 0) {
          return observer.current.disconnect();
        }
        setItemsList([...itemsList, ...response]);
      });
    }
  }, [currentAPIPage]);

  useEffect(() => {
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCurrentAPIPage((prevValue) => prevValue + 1);
      }
    });
    observer.current.observe(lastElement.current);
  }, []);

  return (
    <div className='all-item-list'>
      <Header />
      <main className='all-item-list__body'>
        <h1 className='all-item-list__title'>All Beer</h1>
        <TableList>
          {itemsList.map((itemObject) => (
            <Item
              key={itemObject.id}
              itemName={itemObject.name}
              itemId={itemObject.id}
              itemDescription={itemObject.description}
              itemImgUrl={itemObject.image_url}
              actionItemButton={
                <button
                  className='all-item-list__button'
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
        <div ref={lastElement} className='intersec'></div>
      </main>
    </div>
  );
}
