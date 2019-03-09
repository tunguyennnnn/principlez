import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import ChapterList from '../../components/ChapterList';

const TypeToTitle = {
  ABOUT_ME: 'About Me',
  STORY: 'My Stories',
  LESSON: 'Principles',
};

const OrderedGroup = ['ABOUT_ME', 'STORY', 'LESSON'];

class ChapterGroup extends React.Component {
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

  render() {
    const { data, basePath } = this.props;
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
            <ChapterList
              deleteChapter={this.deleteChapter}
              createChapter={this.createChapter}
              type={type}
              key={`group-${type}-${id}`}
              basePath={basePath}
              title={TypeToTitle[type]}
              chapters={chapters}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

const chapterGroupsQuery = gql`
  query myChapterGroups {
    myChapterGroups {
      id
      type
      chapterListOrder
      chapters {
        id
        title
      }
    }
  }
`;

const createChapterMutation = gql`
  mutation createChapter($type: String!) {
    createChapter(type: $type) {
      chapterGroup {
        id
        type
        chapterListOrder
        chapters {
          id
          title
        }
      }
      chapter {
        id
      }
    }
  }
`;

const deleteChapter = gql`
  mutation deleteChapter($type: String!, $id: ID!) {
    deleteChapter(type: $type, id: $id) {
      id
      type
      chapterListOrder
      chapters {
        id
        title
      }
    }
  }
`;

export default compose(
  graphql(chapterGroupsQuery),
  graphql(createChapterMutation, { name: 'createChapter' }),
  graphql(deleteChapter, { name: 'deleteChapter' }),
)(ChapterGroup);
