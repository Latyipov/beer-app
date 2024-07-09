import React, { FC } from 'react';
import { BeerItem } from '@/App/types/BeerItem';
import { RatingStars } from '@components/RatingStars/RatingStars';
import imgError from '@/App/images/error-beer-img.png';

type TableItemProps = {
  itemObject: BeerItem;
  children: React.ReactNode;
};

const TableItem: FC<TableItemProps> = ({ itemObject, children }) => {
  if (itemObject) {
    const { id, name, price, rating, image } = itemObject;

    return (
      <tr className='table__row'>
        <td className='table__cells'>{id}</td>
        <td className='table__cells'>{name}</td>
        <td className='table__cells'>{price}</td>
        <td className='table__cells'>
          <RatingStars rating={rating} />
        </td>
        <td className='table__cells'>
          <img
            onError={(element) => {
              (element.target as HTMLImageElement).onerror = null;
              (element.target as HTMLImageElement).src = imgError;
            }}
            src={image}
            alt={`img beer ${name}`}
            className='table__cells-img'
          />
        </td>
        <td className='table__cells'>{children}</td>
      </tr>
    );
  }
  return null;
};

export { TableItem };
