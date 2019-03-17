import React from 'react';
import MediaQuery from 'react-responsive';

import BottomMenu from '../../components/commons/BottomMenu';
import ButtonMenu from '../../components/commons/ButtonMenu';
import ViewerButtonActions from './ViewerButtonActions';
import ViewerBottomActions from './ViewerBottomActions';

export default class Action extends React.Component {
  render() {
    return (
      <div class="story-page-action-container">
        <MediaQuery query="(max-width: 850px">
          <BottomMenu>
            <ViewerBottomActions />
          </BottomMenu>
        </MediaQuery>
        <MediaQuery query="(min-width: 850px">
          <ButtonMenu>
            <ViewerButtonActions />
          </ButtonMenu>
        </MediaQuery>
      </div>
    );
  }
}
