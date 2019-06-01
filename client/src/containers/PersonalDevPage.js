import React from 'react';
import { compose, graphql } from 'react-apollo';
import {
  newItemsQuery,
  learningAreas,
  createItemToLearnMutation,
  createLearningAreaMutation,
} from './personaldev/graphql';

import DevAreas from './personaldev/DevAreas';
import NewItems from './personaldev/NewItems';
import Sidebar from './SideBar';
import SideBarContent from './personaldev/SideBar';

class PersonalDevPage extends React.Component {
  createLearningArea = async ({ name, description }) => {};

  createNewItems = async ({ title, description, source, learningAreaId }) => {
    console.log(title, description, source, learningAreaId);
  };

  render() {
    return (
      <React.Fragment>
        <Sidebar>
          <SideBarContent data={this.props.learningAreas} />
        </Sidebar>
        <div className="row row-space-30">
          <div className="col-sm-12 col-lg-8">
            <DevAreas data={this.props.learningAreas} />
          </div>
          <div className="col-sm-12 col-lg-4">
            <NewItems data={this.props.newItems} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default compose(
  graphql(newItemsQuery, {
    name: 'newItems',
    options: props => {
      return {
        variables: {},
      };
    },
  }),
  graphql(learningAreas, {
    name: 'learningAreas',
    options: props => {
      return {
        variables: {},
      };
    },
  }),
  graphql(createItemToLearnMutation, {
    name: 'createItemToLearn',
  }),
  graphql(createLearningAreaMutation, {
    name: 'createLearningArea',
  }),
)(PersonalDevPage);
