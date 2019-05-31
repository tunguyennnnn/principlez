import React from 'react';
import TodoList from '../../components/TodoList';
import ListLoading from '../../components/hoc/ListLoadingHoc';

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

function LearningAreas(props) {
  const Comp = props => {
    const { data } = props;

    const { learningAreas } = data;
    return (
      <TodoList
        cart
        key={'sidebar-item'}
        header="Learning Areas"
        items={learningAreas}
      />
    );
  };
  return ListLoading(Comp)(props);
}

export default class SideBar extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div style={{ padding: 10 }}>
        <LearningAreas data={data} />
      </div>
    );
  }
}
