import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

import ChapterList from '../../components/ChapterList';

const TypeToTitle = {
  ABOUT_ME: 'About Me',
  STORY: 'My Stories',
  LESSON: 'Principles',
};

const OrderedGroup = ['ABOUT_ME', 'STORY', 'LESSON'];

class ChapterGroup extends React.Component {
  updateTitle = (chapterId, title, type) => {
    this.props.data.updateQuery((prev, options) => {
      const chapterGroup = _.find(prev.myChapterGroups, { type });
      const chapter = _.find(chapterGroup.chapters, { id: chapterId });
      chapter.title = title;
      return prev;
    });
  };

  componentDidMount() {
    this.props.updateTitleRef(this.updateTitle);
  }

  reorderChapters = async (chapterGroupId, sourceIndex, destinationIndex) => {
    try {
      const chapterGroup = _.find(this.props.data.myChapterGroups, {
        id: chapterGroupId,
      });
      const newOrder = chapterGroup.chapterListOrder;

      const temp = newOrder[sourceIndex];
      newOrder[sourceIndex] = newOrder[destinationIndex];
      newOrder[destinationIndex] = temp;

      await this.props.reorderChapters({
        variables: { chapterGroupId, newOrder },
      });
    } catch (e) {
      console.log(e);
    }
  };

  deleteChapter = async (type, id) => {
    try {
      await this.props.deleteChapter({
        variables: { type, id },
      });
    } catch (e) {
      console.log(e);
    }
  };

  createChapter = async type => {
    try {
      await this.props.createChapter({
        variables: { type },
      });
    } catch (e) {
      console.log(e);
    }
  };

  getStyle = () => {
    const { mobile } = this.props;
    if (mobile) {
      return {
        width: 300,
        paddingLeft: 20,
      };
    }

    return {
      position: 'fixed',
      width: 200,
    };
  };

  render() {
    const { data, mobile } = this.props;

    if (data.loading) {
      return <div>...loading</div>;
    }

    if (data.error) {
      return <div>something is wrong</div>;
    }

    const { myChapterGroups } = data;

    return (
      <React.Fragment>
        {_.sortBy(myChapterGroups, group =>
          OrderedGroup.indexOf(group.type),
        ).map(group => {
          const { type, id, chapters } = group;
          return (
            <div style={this.getStyle()} key={`chapter-group-${id}`}>
              <ChapterList
                reorderChapters={this.reorderChapters}
                deleteChapter={this.deleteChapter}
                createChapter={this.createChapter}
                key={`group-${type}-${id}`}
                type={type}
                chapters={chapters}
              />
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

const chapterGroupFields = gql`
  fragment chapterGroupFields on ChapterGroup {
    id
    type
    chapterListOrder
    chapters {
      id
      title
      like {
        count
      }
      view {
        count
        anonymousCount
      }
    }
  }
`;

const chapterGroupsQuery = gql`
  query myChapterGroups {
    myChapterGroups {
      ...chapterGroupFields
    }
  }
  ${chapterGroupFields}
`;

const createChapterMutation = gql`
  mutation createChapter($type: String!) {
    createChapter(type: $type) {
      chapterGroup {
        ...chapterGroupFields
      }
      chapter {
        id
      }
    }
  }
  ${chapterGroupFields}
`;

const deleteChapter = gql`
  mutation deleteChapter($type: String!, $id: ID!) {
    deleteChapter(type: $type, id: $id) {
      ...chapterGroupFields
    }
  }
  ${chapterGroupFields}
`;

const reorderChapters = gql`
  mutation reorderChapters($chapterGroupId: ID!, $newOrder: [ID!]!) {
    reorderChapters(chapterGroupId: $chapterGroupId, newOrder: $newOrder) {
      ...chapterGroupFields
    }
  }
  ${chapterGroupFields}
`;

export default compose(
  graphql(chapterGroupsQuery),
  graphql(createChapterMutation, { name: 'createChapter' }),
  graphql(deleteChapter, { name: 'deleteChapter' }),
  graphql(reorderChapters, { name: 'reorderChapters' }),
)(ChapterGroup);
