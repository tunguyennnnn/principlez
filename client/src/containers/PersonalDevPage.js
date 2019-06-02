import React from 'react';
import { compose, graphql } from 'react-apollo';
import _ from 'lodash';

import {
  newItemsQuery,
  learningAreas,
  createItemToLearnMutation,
  createLearningAreaMutation,
  deleteLearningAreaMutation,
  deleteItemToLearnMutation,
} from './personaldev/graphql';

import Notification from '../components/commons/Notification';
import MenuContext from '../contexts/MenuContext';
import FormContext from '../contexts/FormContext';
import DevAreas from './personaldev/DevAreas';
import NewItems from './personaldev/NewItems';
import Sidebar from './SideBar';
import SideBarContent from './personaldev/SideBar';

class PersonalDevPage extends React.Component {
  addNotification = (type, title, message) => {
    this.props.notificationDOMRef.current.addNotification({
      insert: 'top',
      container: 'top-left',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 2000 },
      dismissable: { click: true },
      content: <Notification type={type} title={title} message={message} />,
    });
  };

  deleteLearningArea = async id => {
    try {
      await this.props.deleteLearningArea({
        variables: { id },
        update: (store, { data: { deleteLearningArea } }) => {
          if (deleteLearningArea && deleteLearningArea.error) {
            const { error } = deleteLearningArea;
            return this.addNotification('warning', error);
          }

          const data = _.cloneDeep(store.readQuery({ query: learningAreas }));
          data.learningAreas = data.learningAreas.filter(
            area => area.id !== id,
          );

          store.writeQuery({ query: learningAreas, data });
        },
      });
    } catch (e) {
      this.addNotification('warning', 'Something wrong');
    }
  };

  deleteItemToLearn = async id => {
    try {
      await this.props.deleteItemToLearn({
        variables: { id },
        update: (store, { data: { deleteItemToLearn } }) => {
          if (deleteItemToLearn && deleteItemToLearn.error) {
            const { error } = deleteItemToLearn;
            return this.addNotification('warning', error);
          }

          const data = _.cloneDeep(store.readQuery({ query: newItemsQuery }));
          data.newItems.edges = data.newItems.edges.filter(
            ({ cursor, node }) => node.id !== id,
          );

          store.writeQuery({ query: newItemsQuery, data });
        },
      });
    } catch (e) {
      this.addNotification('warning', 'Something wrong');
    }
  };

  createLearningArea = async ({ name, description }) => {
    try {
      await this.props.createLearningArea({
        variables: { name, description },
        update: (store, { data: { createLearningArea } }) => {
          const data = _.cloneDeep(store.readQuery({ query: learningAreas }));
          data.learningAreas.push(createLearningArea);
          store.writeQuery({ query: learningAreas, data });
        },
      });
    } catch (e) {
      this.addNotification('warning', 'Something wrong');
    }
  };

  createNewItems = async ({ name, description, source }) => {
    try {
      await this.props.createItemToLearn({
        variables: { name, description, source },
        update: (store, { data: { createItemToLearn } }) => {
          const data = _.cloneDeep(store.readQuery({ query: newItemsQuery }));
          data.newItems.edges.push({
            __typename: 'ItemToLearnEdge',
            cursor: createItemToLearn.id,
            node: createItemToLearn,
          });
          store.writeQuery({ query: newItemsQuery, data });
        },
      });
    } catch (e) {
      console.log(e);
      this.addNotification('warning', 'Something wrong');
    }
  };

  render() {
    return (
      <React.Fragment>
        <Sidebar>
          <MenuContext.Provider
            value={{
              items: [{ name: 'Delete', action: this.deleteLearningArea }],
              keyPrefix: `pd-area-action`,
            }}
          >
            <FormContext.Provider
              value={{
                submit: this.createLearningArea,
                fields: ['name', 'description'],
              }}
            >
              <SideBarContent data={this.props.learningAreas} />
            </FormContext.Provider>
          </MenuContext.Provider>
        </Sidebar>
        <div className="row row-space-30">
          <div className="col-sm-12 col-lg-8">
            <DevAreas data={this.props.learningAreas} />
          </div>
          <div className="col-sm-12 col-lg-4">
            <MenuContext.Provider
              value={{
                items: [{ name: 'Delete', action: this.deleteItemToLearn }],
                keyPrefix: `pd-area-action`,
              }}
            >
              <FormContext.Provider
                value={{
                  submit: this.createNewItems,
                  fields: ['name', 'description', 'source'],
                }}
              >
                <NewItems data={this.props.newItems} />
              </FormContext.Provider>
            </MenuContext.Provider>
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
  graphql(deleteLearningAreaMutation, {
    name: 'deleteLearningArea',
  }),
  graphql(deleteItemToLearnMutation, {
    name: 'deleteItemToLearn',
  }),
)(PersonalDevPage);
