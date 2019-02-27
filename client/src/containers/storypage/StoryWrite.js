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

  uploadImage = async file => {
    const { id: storyId, chapterId } = this.props.match.params;
    console.log(storyId, chapterId);
    console.log(file);
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
    const { data, location, uploadImageTheme } = this.props;

    if (data.loading) return <div>...loading</div>;

    const { title, body, type, imageTheme } = data.chapter;

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
          <BlogEditor body={body} />
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

const queryChapter = gql`
  query chapter($storyId: ID!, $chapterId: ID) {
    chapter(storyId: $storyId, chapterId: $chapterId) {
      imageTheme {
        medium
        large
      }
      type
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
)(StoryPage);
