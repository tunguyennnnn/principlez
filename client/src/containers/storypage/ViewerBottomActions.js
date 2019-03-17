import React from 'react';
import { Grid } from 'semantic-ui-react';

import IconButton from '../../components/commons/IconButton';

const Match = {
  like: {
    yesText: 'You liked the story',
    noText: 'Like the story!',
    yesIcon: 'star',
    noIcon: 'star outline',
  },
};

export default function ViewerBottomActions({ liked, likeAction }) {
  const likeIcon = liked ? Match.like.yesIcon : Match.like.noIcon;
  const likeText = liked ? Match.like.yesText : Match.like.noText;

  return (
    <div class="bottom-action-container">
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column className="viewer-bottom-action">
            <IconButton
              iconName={likeIcon}
              text={likeText}
              action={likeAction}
              horizontal
            />
          </Grid.Column>
          <Grid.Column className="viewer-bottom-action">
            <IconButton
              iconName="newspaper outline"
              text="Comment"
              horizontal
            />
          </Grid.Column>
          <Grid.Column className="viewer-bottom-action">
            <IconButton iconName="plus square" text="Save" horizontal />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
