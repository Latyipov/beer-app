import React from 'react';

export function Item({ itemName, itemId, itemDescription, itemImgUrl, actionItemButton }) {
  return (
    <div className='factsBox'>
      <h3>ID: {itemId}</h3>
      <h4>{itemName}</h4>
      <p>{itemDescription}</p>
      <img src={itemImgUrl} alt={`img beer ${itemName}`} height='300px' />
      {actionItemButton}
    </div>
  );
}
