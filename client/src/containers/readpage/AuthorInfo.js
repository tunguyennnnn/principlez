import React from 'react';
import { Image } from 'semantic-ui-react';

export default function AuthorInfo(props) {
  const { fullname, profileImage, yearOfBirth } = props;
  return (
    <div class="author">
      <div class="profile-image">
        {profileImage && <Image src={profileImage.medium} />}
      </div>
      <div class="profile">{fullname}</div>
    </div>
  );
}
