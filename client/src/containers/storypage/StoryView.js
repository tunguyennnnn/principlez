import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';

import BlogEditor from '../../components/BlogEditor';

class StoryView extends React.Component {
  render() {
    const { data } = this.props;
    if (data.loading) return <div>...loading</div>;

    const { title, body, type, imageTheme } = data.chapter;

    return (
      <div>
        <BlogEditor title={title} body={body} readOnly />
      </div>
    );
  }
}

const queryChapter = gql`
  query chapter($chapterId: ID!) {
    chapter: chapter(chapterId: $chapterId) {
      type
      imageTheme {
        medium
        large
      }
      title
      body
    }
  }
`;

export default compose(
  graphql(queryChapter, {
    options: props => {
      return {
        variables: {
          storyId: props.match.params.id,
          chapterId: props.match.params.chapterId,
        },
      };
    },
  }),
)(StoryView);
