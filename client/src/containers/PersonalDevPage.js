import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import NewItems from './personaldev/NewItems';

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import TodoList from '../components/TodoList';
import Sidebar from './SideBar';
import SideBarContent from './personaldev/SideBar';

const randomColor = [
  'bg-yellow',
  // 'bg-gradient-purple',
  'bg-pink',
  'bg-gradient-aqua',
];
const PersonalDevAreas = [
  {
    id: 1,
    name: 'Books',
    icon: 'book',
    items: [
      {
        id: 1,
        done: true,
        title: 'Principles',
        description: 'by Ray Dalio',
      },
      {
        id: 2,
        done: false,
        title: 'The hero with 1000 faces',
        description: 'by Joseph Campbell',
      },
    ],
  },
  {
    id: 2,
    name: 'Videos',
    icon: 'video',
    items: [
      {
        id: 1,
        done: true,
        title: 'Principles',
        description: 'by Ray Dalio',
      },
      {
        id: 2,
        done: false,
        title: 'The hero with 1000 faces',
        description: 'by Joseph Campbell',
      },
    ],
  },
  {
    id: 2,
    name: 'Articles',
    icon: 'align-right',
    items: [
      {
        id: 1,
        done: true,
        title: 'Principles',
        description: 'by Ray Dalio',
      },
      {
        id: 2,
        done: false,
        title: 'The hero with 1000 faces',
        description: 'by Joseph Campbell',
      },
    ],
  },
];

class PersonalDevPage extends React.Component {
  render() {
    console.log(this.props.learningAreas);
    return (
      <React.Fragment>
        <Sidebar>
          <SideBarContent data={this.props.learningAreas} />
        </Sidebar>
        <div className="row row-space-30">
          <div className="col-sm-12 col-lg-8">
            {PersonalDevAreas.map(area => {
              const { name: header, id, items } = area;
              return (
                <div key={`personal-dev-area-${id}`}>
                  <TodoList key={'areas'} header={header} items={items} />
                </div>
              );
            })}
          </div>
          <div className="col-sm-12 col-lg-4">
            <NewItems data={this.props.newItems} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const newItemsQuery = gql`
  query newLearningItems($cursor: String, $limit: Int) {
    newItems: newLearningItems(cursor: $cursor, limit: $limit) {
      pageInfo {
        total
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title: name
          description
          source
        }
      }
    }
  }
`;

const learningAreas = gql`
  query learningAreas {
    learningAreas {
      id
      title: name
      description
    }
  }
`;

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
)(PersonalDevPage);
