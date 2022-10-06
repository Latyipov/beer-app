import React from 'react';

export function TableList(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Picture</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
    </table>
  );
}
