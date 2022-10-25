import React from 'react';

export function Item({ itemName, itemId, itemDescription, itemImgUrl, actionItemButton }) {
  return (
    <tr className='table__row'>
      <td className='table__cells'>{itemId}</td>
      <td className='table__cells'>{itemName}</td>
      <td className='table__cells'>{itemDescription}</td>
      <td className='table__cells'>
        <img src={itemImgUrl} alt={`img beer ${itemName}`} height='300px' />
      </td>
      <td className='table__cells'>{actionItemButton}</td>
    </tr>
  );
}
