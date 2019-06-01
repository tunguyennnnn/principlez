import React from 'react';
import { compose, graphql } from 'react-apollo';
import {
  newItemsQuery,
  learningAreas,
  createItemToLearnMutation,
  createLearningAreaMutation,
} from './personaldev/graphql';

import FormContext from '../contexts/FormContext';
import DevAreas from './personaldev/DevAreas';
import NewItems from './personaldev/NewItems';
import Sidebar from './SideBar';
import SideBarContent from './personaldev/SideBar';

class PersonalDevPage extends React.Component {
  createLearningArea = async ({ name, description }) => {
    try {
      await this.props.createLearningArea({
        variables: { name, description },
        update: (store, { data: { createLearningArea } }) => {
          const data = store.readQuery({ query: learningAreas });
          data.learningAreas.push(createLearningArea);
          store.writeQuery({ query: learningAreas, data });
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  createNewItems = async ({ title, description, source, learningAreaId }) => {
    console.log(title, description, source, learningAreaId);
  };

  render() {
    return (
      <React.Fragment>
        <Sidebar>
          <FormContext.Provider value={{ submit: this.createLearningArea }}>
            <SideBarContent data={this.props.learningAreas} />
          </FormContext.Provider>
        </Sidebar>
        <div className="row row-space-30">
          <div className="col-sm-12 col-lg-8">
            <FormContext.Provider value={{ submit: this.createNewItems }}>
              <DevAreas data={this.props.learningAreas} />
            </FormContext.Provider>
          </div>
          <div className="col-sm-12 col-lg-4">
            <FormContext.Provider value={{ submit: this.createNewItems }}>
              <NewItems data={this.props.newItems} />
            </FormContext.Provider>
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
