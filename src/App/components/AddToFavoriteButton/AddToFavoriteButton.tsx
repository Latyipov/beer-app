import React, { FC } from 'react';
import { pushData } from '@api-helpers/api-helpers';
import UserState from '@/App/services/MobX/store/UserState';
import { BeerItem } from '@/App/types/BeerItem';

type AddToFavoriteButtonProps = {
  checkingData: { [id: string]: { id: string } } | null;
  itemObject: BeerItem;
};

const AddToFavoriteButton: FC<AddToFavoriteButtonProps> = ({ checkingData, itemObject }) => {
  const { id } = itemObject;
  const userId = UserState.userStateData.id;

  const isAlreadyInFavorite =
    !!checkingData &&
    Object.values(checkingData).some((favoriteObject) => favoriteObject.id === id);

  return isAlreadyInFavorite ? (
    <button className='table__button' disabled={true}>
      in favorite
    </button>
  ) : (
    <button
      disabled={!userId}
      className='table__button'
      onClick={() => !!userId && pushData(userId, 'favorite', itemObject)}
    >
      add to favorite
    </button>
  );
};
export { AddToFavoriteButton };
