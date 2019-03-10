import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';

import ImageUpload from '../../components/ImageUpload';
import BlogEditor from '../../components/BlogEditor';
import StoryWriteContext from '../../contexts/StoryWriteContext';

const PlaceHolder = {
  ABOUT_ME: 'Tell us about you...',
  CHAPTER: 'Tell us your story...',
  LESSON: 'What you want us to learn...',
};

class StoryPage extends React.Component {
  placeHolder(type) {
    const placeHolder = PlaceHolder[type];
    return placeHolder || PlaceHolder.CHAPTER;
  }

  updateChapterContent = async (title, body) => {
    const { chapterId: id } = this.props.match.params;
    try {
      const { updateChapterContent } = this.props;
      await updateChapterContent({
        variables: { id, title, body },
      });
      this.props.updateChapterTitle(id, title);
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
    const { data } = this.props;
    if (data.loading) return <div>...loading</div>;

    const { id, title, body, type, imageTheme } = data.chapter;
    return (
      <StoryWriteContext.Provider
        value={{
          placeholderText: this.placeHolder(type),
        }}
      >
        <div>
          <ImageUpload
            imageUrl={imageTheme && imageTheme.large}
            uploadImage={this.uploadImage}
          />
          <BlogEditor
            title={title}
            body={body}
            update={this.updateChapterContent}
          />
        </div>
      </StoryWriteContext.Provider>
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
  graphql(uploadImageTheme, { name: 'uploadImageTheme' }),
  graphql(updateChapterContentMutation, { name: 'updateChapterContent' }),
)(StoryPage);
