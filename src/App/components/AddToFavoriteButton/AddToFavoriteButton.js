import React from 'react';
import PropTypes from 'prop-types';
import { useAuthentication } from '@/App/Redux/hooks/use-auth';
import { pushData } from '@api-helpers/api-helpers';

export function AddToFavoriteButton({ checkingData, itemObject }) {
  // we need this disable line because "image_name" coming from api object.
  // That there is no confusion with url element names we save this element with the same name.
  // eslint-disable-next-line camelcase
  const { id, name, description, image_url } = itemObject;
  const { userId } = useAuthentication();

  const alreadyInFavorite =
    checkingData && Object.values(checkingData).some((favoriteObject) => favoriteObject.id === id);

  return alreadyInFavorite ? (
    <button className='table__button' disabled={true}>
      in favorite
    </button>
  ) : (
    <button
      className='table__button'
      onClick={() =>
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
}

AddToFavoriteButton.propTypes = {
  checkingData: PropTypes.object,
  itemObject: PropTypes.object.isRequired,
};
