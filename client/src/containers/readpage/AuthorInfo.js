import './authorinfo.scss';
import React from 'react';
import { Image } from 'semantic-ui-react';

export default function AuthorInfo(props) {
  const { id, fullname, location, profileImage, yearOfBirth } = props;
  return (
    <div className="author">
      <div className="profile-image">
        {profileImage && <Image src={profileImage.medium} />}
      </div>
      <div className="profile">
        <div className="fullname">{fullname}</div>
        <div className="location">{`${location.city} - ${
          location.country
        }`}</div>
      </div>
    </div>
  );
}
