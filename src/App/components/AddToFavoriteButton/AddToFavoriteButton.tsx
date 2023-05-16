import React, { FC } from 'react';
import { pushData } from '@api-helpers/api-helpers';
import UserState from '@/App/services/MobX/store/UserState';
import { BeerItem } from '@/App/types/BeerItem';

type AddToFavoriteButtonProps = {
  checkingData: { [id: string]: { id: string } } | null;
  itemObject: BeerItem;
};

const AddToFavoriteButton: FC<AddToFavoriteButtonProps> = ({ checkingData, itemObject }) => {
  // we need this disable line because "image_url" coming from api object.
  // That there is no confusion with url element names we save this element with the same name.
  // eslint-disable-next-line camelcase
  const { id, name, description, image_url } = itemObject;
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
      className='table__button'
      onClick={() =>
        !!userId &&
        pushData(userId, 'favorite', {
          id: id,
          name: name,
          description: description,
          image_url: image_url,
        })
      }
    >
      add to favorite
    </button>
  );
};
export { AddToFavoriteButton };
