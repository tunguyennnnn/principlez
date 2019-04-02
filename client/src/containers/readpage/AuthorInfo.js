import React from 'react';
import { Image } from 'semantic-ui-react';

export default function AuthorInfo(props) {
  const { fullname, profileImage, yearOfBirth } = props;
  return (
    <div>
      {profileImage && <Image src={profileImage.medium} />}
      <div>{fullname}</div>
    </div>
  );
}
