import './profileimage.scss';

import React from 'react';

import FakeProfileImage from '../../assets/darth_vader.jpg';

export default function ProfileImage() {
  return (
    <div className="profile-image-container">
      <div>
        <img src={FakeProfileImage} />
      </div>
      <div>Change Profile Photo</div>
    </div>
  );
}
