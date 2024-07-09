import React, { FC } from 'react';
import './RatingStars.scss';

type RatingStarsProps = {
  rating: { average: number; reviews: number };
};

const RatingStars: FC<RatingStarsProps> = ({ rating }) => {
  const { average, reviews } = rating;
  const ratingFxed = average.toFixed(1);
  return (
    <div>
      <div className='rating'>
        <div
          className='Stars'
          style={{ '--rating': ratingFxed } as React.CSSProperties}
          aria-label='Rating of this product is 2.3 out of 5.'
        ></div>
      </div>
      <div className='rating__value'>rating: {ratingFxed}</div>
      <div className='rating__value'>reviwers: {reviews}</div>
    </div>
  );
};
export { RatingStars };
