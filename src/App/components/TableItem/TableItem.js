import React from 'react';

export function TableItem({ children, itemObject }) {
  if (itemObject) {
    // we need this disable line because "image_name" coming from api object.
    // eslint-disable-next-line camelcase
    const { id, name, description, image_url } = itemObject;
    return (
      <tr className='table__row'>
        <td className='table__cells'>{id}</td>
        <td className='table__cells'>{name}</td>
        <td className='table__cells'>{description}</td>
        <td className='table__cells'>
          {/* eslint-disable-next-line camelcase */}
          <img src={image_url} alt={`img beer ${name}`} className='table__cells-img' />
        </td>
        <td className='table__cells'>{children}</td>
      </tr>
    );
  }
  return null;
}
