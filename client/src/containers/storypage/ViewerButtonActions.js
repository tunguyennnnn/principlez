import React from 'react';
import IconButton from '../../components/commons/IconButton';

export default function ViewerButtonAction(props) {
  return (
    <div class="button-action-container">
      <IconButton iconName="thumbs up" text="Like the story" />
      <IconButton iconName="newspaper outline" text="Give your thought" />
      <IconButton iconName="plus square" text="Save the story" />
    </div>
  );
}
