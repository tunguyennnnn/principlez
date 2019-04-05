import React from 'react';
import IconButton from '../../components/commons/IconButton';

const Match = {
  like: {
    yesText: 'You liked the story',
    noText: 'Like the story!',
    yesIcon: 'star',
    noIcon: 'star outline',
  },
};

export default function ViewerButtonAction({ liked, likeAction }) {
  const likeIcon = liked ? Match.like.yesIcon : Match.like.noIcon;
  const likeText = liked ? Match.like.yesText : Match.like.noText;

  return (
    <div className="button-action-container">
      <IconButton iconName={likeIcon} text={likeText} action={likeAction} />
      <IconButton iconName="newspaper outline" text="Give your thought" />
      <IconButton iconName="plus square" text="Save the story" />
    </div>
  );
}
