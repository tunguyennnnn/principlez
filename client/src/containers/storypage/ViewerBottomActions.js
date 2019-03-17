import React from 'react';
import { Grid } from 'semantic-ui-react';

import IconButton from '../../components/commons/IconButton';

export default function ViewerBottomActions(props) {
  return (
    <div class="bottom-action-container">
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column className="viewer-bottom-action">
            <IconButton iconName="star outline" text="Like" horizontal />
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
