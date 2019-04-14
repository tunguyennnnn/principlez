import './storywrite.scss';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import { Redirect } from 'react-router-dom';

import BlogEditor from '../../components/BlogEditor';

class StoryPage extends React.Component {
  updateChapterContent = async (title, body) => {
    const { type } = this.props.data.chapter;
    const { chapterId: id } = this.props.match.params;
    try {
      const { updateChapterContent } = this.props;
      await updateChapterContent({
        variables: { id, title, body },
      });
      this.props.updateChapterTitle(id, title, type);
    } catch (e) {
      console.log(e);
    }
  };

  uploadImage = async file => {
    const { id: storyId, chapterId } = this.props.match.params;
    try {
      await this.props.uploadImageTheme({
        variables: {
          storyId,
          chapterId,
          file,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { data, location, mobile } = this.props;
    if (data.loading) return <div>...loading</div>;
    const { title, body, type, imageTheme, isAuthor } = data.chapter;
    if (!isAuthor) {
      return (
        <Redirect
          to={{
            pathname: `${location.pathname}/view`,
            state: { from: this.props.location },
          }}
        />
      );
    }

    return (
      <div class={`story-write-containter ${mobile ? 'mobile' : ''}`}>
        <BlogEditor
          title={title}
          body={body}
          update={this.updateChapterContent}
        />
      </div>
    );
  }
}

const uploadImageTheme = gql`
  mutation uploadImageTheme($storyId: ID!, $chapterId: ID, $file: Upload!) {
    uploadImageTheme(storyId: $storyId, chapterId: $chapterId, file: $file) {
      medium
      large
    }
  }
`;

const updateChapterContentMutation = gql`
  mutation updateChapterContent($id: ID!, $title: String, $body: JSON) {
    chapter: updateChapterContent(id: $id, title: $title, body: $body) {
      id
      title
      body
    }
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
      isAuthor
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
        fetchPolicy: 'network-only',
      };
    },
  }),
  graphql(uploadImageTheme, { name: 'uploadImageTheme' }),
  graphql(updateChapterContentMutation, { name: 'updateChapterContent' }),
)(StoryPage);
