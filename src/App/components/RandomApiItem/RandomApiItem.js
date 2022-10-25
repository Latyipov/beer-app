import React, { useState } from 'react';
import { sendApiRequest } from '@components/sendApiRequest/sendApiRequest';
import { Item } from '@components/Item/Item';
import { pushDataToFirebase } from '@components/firebaseFunctions/pushDataToFirebase/pushDataToFirebase';
import { useAuthentication } from '@/App/Redux/hooks/use-auth';
import { TableList } from '@components/TableList/TableList';

import '@components/RandomApiItem/RandomApiItem.scss';

export function RandomApiItem() {
  const [randomItem, setRandomItem] = useState('');
  const { userId } = useAuthentication();

  const onShowRandomItemButtonClick = async () => {
    const responseData = await sendApiRequest('beers/random');
    setRandomItem(responseData);
  };

  const clearRandomItem = () => {
    setRandomItem('');
  };

  return (
    <div className='random-item'>
      <button className='random-item__button' onClick={onShowRandomItemButtonClick}>
        Show random Beer
      </button>

      {randomItem && (
        <button className='random-item__button' onClick={clearRandomItem}>
          Hide
        </button>
      )}

      {randomItem && (
        <TableList>
          {randomItem.map((itemObject) => (
            <Item
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
      )}
    </div>
  );
}
