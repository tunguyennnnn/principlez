import './profilepage.scss';

import React from 'react';
import { Image } from 'semantic-ui-react';

import FakeProfileImage from '../../assets/darth_vader.jpg';

export default class ProfileImage extends React.Component {
  render() {
    return (
      <div className="profile-image-container">
        <Image size="medium" src={FakeProfileImage} />
      </div>
    );
  }
}
