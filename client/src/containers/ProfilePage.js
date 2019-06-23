import './profilepage/profilepage.scss';
import React from 'react';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import _ from 'lodash';
import queryString from 'query-string';

import { PageSettings } from '../config/page-settings';
import About from './profilepage/About';
import Activities from './profilepage/Activities';
import ProfileHeader from './profilepage/ProfileHeader';

const MAP_TAB_TO_COMPONENT = {
  About: About,
  Activities: Activities,
};

class ProfilePage extends React.Component {
  static contextType = PageSettings;

  constructor(props) {
    super(props);

    const queries = queryString.parse(this.props.location.search);
    const activeTab =
      queries.tab &&
      _.keys(MAP_TAB_TO_COMPONENT).find(
        tab => tab === queries.tab || tab.toLowerCase() === queries.tab,
      );
    this.state = {
      activeTab: activeTab || 'Activities',
    };
  }

  componentDidMount() {
    this.context.handleSetPageSidebar(false);
  }

  componentWillUnmount() {
    this.context.handleSetPageSidebar(true);
  }

  showTab = tab => {
    if (MAP_TAB_TO_COMPONENT[tab] && tab !== this.state.activeTab) {
      this.setState({ activeTab: tab });
      this.props.history.push({
        search: `?tab=${tab}`,
      });
    }
  };

  render() {
    const { data } = this.props;
    if (data.loading) return null;

    const ActiveComp = MAP_TAB_TO_COMPONENT[this.state.activeTab];
    const {
      fullname,
      yearOfBirth,
      blurb,
      occupation,
      location,
      profileImage,
    } = data.me;
    return (
      <div>
        <ProfileHeader
          fullname={fullname}
          occupation={occupation}
          profileImage={profileImage}
          location={location}
          tabs={_.keys(MAP_TAB_TO_COMPONENT)}
          showTab={this.showTab}
          activeTab={this.state.activeTab}
        />
        <ActiveComp profile={data.me} />
      </div>
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
      profileImage {
        medium
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
)(ProfilePage);
