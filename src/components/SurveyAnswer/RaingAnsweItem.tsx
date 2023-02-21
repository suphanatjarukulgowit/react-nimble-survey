import React from 'react';

import coin from 'assets/images/coin.svg';
import heart from 'assets/images/heart.svg';
import smile from 'assets/images/smiley.svg';
import star from 'assets/images/star.svg';

type AnswerIcons = {
  [key: string]: string;
};

const answerIcons: AnswerIcons = {
  heart: heart,
  money: coin,
  smiley: smile,
  star: star,
};

interface RatingAnswerItemProps {
  ratingType?: keyof AnswerIcons;
  answerStateClass: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const RatingAnswerItem = ({
  ratingType = 'star',
  answerStateClass,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: RatingAnswerItemProps) => (
  <button
    className={`rating-button ${answerStateClass}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <img src={answerIcons[ratingType]} alt={`${ratingType} icon`} />
  </button>
);

export default RatingAnswerItem;
