import React from 'react';

export function TableItem({ itemName, itemId, itemDescription, itemImgUrl, actionItemButton }) {
  return (
    <tr className='table__row'>
      <td className='table__cells'>{itemId}</td>
      <td className='table__cells'>{itemName}</td>
      <td className='table__cells'>{itemDescription}</td>
      <td className='table__cells'>
        <img src={itemImgUrl} alt={`img beer ${itemName}`} className='table__cells-img' />
      </td>
      <td className='table__cells'>{actionItemButton}</td>
    </tr>
  );
}