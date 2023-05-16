import React, { FC } from 'react';
import './Table.scss';

type TableListProps = {
  children: React.ReactNode;
};
const TableList: FC<TableListProps> = ({ children }) => {
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
      <tbody>{children}</tbody>
    </table>
  );
};
export { TableList };
