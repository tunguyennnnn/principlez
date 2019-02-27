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

  render() {
    const { data, location } = this.props;

    if (data.loading) return <div>...loading</div>;

    const { title, body, type, imageTheme } = data.chapter;

    return (
      <StoryWriteContext.Provider
        value={{
          placeholderText: this.placeHolder(type),
        }}
      >
        <div>
          <ImageUpload imageUrl={imageTheme && imageTheme.large} />
          <BlogEditor body={body} />
        </div>
      </StoryWriteContext.Provider>
    );
  }
}

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
)(StoryPage);
