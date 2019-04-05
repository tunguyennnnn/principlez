import React from 'react';
import { Image } from 'semantic-ui-react';

export default function AuthorInfo(props) {
  const { fullname, profileImage, yearOfBirth } = props;
  return (
    <div className="author">
      <div className="profile-image">
        {profileImage && <Image src={profileImage.medium} />}
      </div>
      <div className="profile">{fullname}</div>
    </div>
  );
}
