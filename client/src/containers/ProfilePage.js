import './profilepage/profilepage.scss';
import React from 'react';
import { PageSettings } from '../config/page-settings';

import ProfileInfo from './profilepage/ProfileInfo';
import ProfileImage from './profilepage/ProfileImage';

export default class ProfilePage extends React.Component {
  static contextType = PageSettings;

  componentDidMount() {
    this.context.handleSetPageSidebar(false);
  }

  componentWillUnmount() {
    this.context.handleSetPageSidebar(true);
  }

  render() {
    return (
      <div>
        <ProfileInfo />
      </div>
    );
  }
}
