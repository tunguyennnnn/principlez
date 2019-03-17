import React from 'react';
import MediaQuery from 'react-responsive';

import BottomMenu from '../../components/commons/BottomMenu';
import ButtonMenu from '../../components/commons/ButtonMenu';
import ButtonAction from './ViewerButtonActions';

export default class Action extends React.Component {
  render() {
    return (
      <div class="story-page-action-container">
        <MediaQuery query="(max-width: 850px">
          <BottomMenu>bottom</BottomMenu>
        </MediaQuery>
        <MediaQuery query="(min-width: 850px">
          <ButtonMenu>
            <ButtonAction />
          </ButtonMenu>
        </MediaQuery>
      </div>
    );
  }
}
