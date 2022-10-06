import React from 'react';

export function Item({ itemName, itemId, itemDescription, itemImgUrl, actionItemButton }) {
  return (
    <tr className=''>
      <td>{itemId}</td>
      <td>{itemName}</td>
      <td>{itemDescription}</td>
      <td>
        <img src={itemImgUrl} alt={`img beer ${itemName}`} height='300px' />
      </td>
      <td>{actionItemButton}</td>
    </tr>
  );
}
