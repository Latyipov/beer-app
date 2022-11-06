import React from 'react';
import './Table.scss';

export function TableList(props) {
  return (
    <table className='table'>
      <thead>
        <tr className='table__header-row'>
          <th className='table__cells'>ID</th>
          <th className='table__cells'>Name</th>
          <th className='table__cells'>Description</th>
          <th className='table__cells'>Picture</th>
          <th className='table__cells'></th>
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
}
