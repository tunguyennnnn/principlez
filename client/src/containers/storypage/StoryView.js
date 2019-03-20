import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';

import BlogEditor from '../../components/BlogEditor';

class StoryView extends React.Component {
  viewChapter = async () => {
    try {
      const { chapterId } = this.props.match.params;
      await this.props.viewChapter({ variables: { chapterId } });
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.viewChapter();
  }

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

const viewChapter = gql`
  mutation viewChapter($chapterId: ID!) {
    viewChapter(chapterId: $chapterId)
  }
`;

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
  graphql(viewChapter, { name: 'viewChapter' }),
)(StoryView);
