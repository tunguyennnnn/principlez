import React from 'react';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

import ProfileInfoEdit from '../../components/ProfileInfoEdit';
import ProfileInfoView from '../../components/ProfileInfoView';

class ProfileInfo extends React.Component {
  state = {
    isEditingInfo: false,
    message: '',
  };

  clickToEditOrViewInfo = () => {
    if (this.state.isEditingInfo) {
      return this.setState({ isEditingInfo: false });
    }
    this.setState({ isEditingInfo: true });
  };

  updateUserInformation = async (fullname, yearOfBirth, blurb, occupation) => {
    try {
      const response = await this.props.updateUserInfo({
        variables: {
          fullname,
          yearOfBirth,
          blurb,
          occupation,
        },
      });
      const {
        data: { updateUserInfo },
      } = response;
      const { error } = updateUserInfo;

      if (error) {
        this.setState({ message: error });
        return;
      }

      await this.props.data.refetch();
      this.clickToEditOrViewInfo();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { data } = this.props;

    if (data.loading) return null;

    const { fullname, yearOfBirth, blurb, occupation, location } = data.me;
    const { isEditingInfo, message: errorMessage } = this.state;
    const ProfileInfoComponent = isEditingInfo
      ? ProfileInfoEdit
      : ProfileInfoView;

    return (
      <ProfileInfoComponent
        fullname={fullname}
        yearOfBirth={yearOfBirth}
        blurb={blurb}
        occupation={occupation}
        location={location}
        updateInfo={this.updateUserInformation}
        onClick={this.clickToEditOrViewInfo}
        readOnly={!isEditingInfo}
        errorMessage={errorMessage}
      />
    );
  }
}

const queryUserInfo = gql`
  query me {
    me {
      fullname
      yearOfBirth
      blurb
      occupation
      location {
        city
        country
      }
    }
  }
`;

const mutationUserInfo = gql`
  mutation updateUserInfo(
    $fullname: String
    $yearOfBirth: String
    $blurb: JSON
    $occupation: String
  ) {
    updateUserInfo(
      fullname: $fullname
      yearOfBirth: $yearOfBirth
      blurb: $blurb
      occupation: $occupation
    ) {
      user {
        fullname
        yearOfBirth
        blurb
        occupation
      }
      error
    }
  }
`;

export default compose(
  graphql(queryUserInfo),
  graphql(mutationUserInfo, { name: 'updateUserInfo' }),
)(ProfileInfo);
