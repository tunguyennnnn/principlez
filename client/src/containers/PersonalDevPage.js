import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import TodoList from '../components/TodoList';
import Sidebar from './SideBar';

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

export default class PersonalDevPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar>
          <div style={{ padding: 10 }}>
            <div
              class="widget-todolist widget-todolist-rounded"
              style={{ marginBottom: 10 }}
            >
              <div class="widget-todolist-header">
                <div class="widget-todolist-header-left">
                  <h4 class="widget-todolist-header-title">Areas</h4>
                </div>
              </div>
              <div class="widget-todolist-body">
                {PersonalDevAreas.map(({ id, name, icon }) => {
                  return (
                    <div
                      class={`widget-todolist-item`}
                      key={`development-are-${id}`}
                    >
                      <div class="widget-todolist-content">
                        <h4 class="widget-todolist-title">{name}</h4>
                      </div>
                    </div>
                  );
                })}
                <div class="widget-todolist-item">
                  <div class="widget-todolist-input">
                    <i class="fa fa-plus text-muted" />
                  </div>
                  <div class="widget-todolist-content">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Write your task here..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Sidebar>
        <div className="row row-space-30">
          <div className="col-sm-12 col-lg-8">
            {PersonalDevAreas.map(area => {
              const { name: header, id, items } = area;
              return (
                <div key={`personal-dev-area-${id}`}>
                  <TodoList header={header} items={items} />
                </div>
              );
            })}
          </div>
          <div className="col-sm-12 col-lg-4">
            <TodoList
              cart
              header={'New Items'}
              items={[
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
                {
                  id: 3,
                  done: true,
                  title: 'Principles',
                  description: 'by Ray Dalio',
                },
                {
                  id: 4,
                  done: false,
                  title: 'The hero with 1000 faces',
                  description: 'by Joseph Campbell',
                },
              ]}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// export default compose()(PersonalDevPage);
