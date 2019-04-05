import React from 'react';
import MediaQuery from 'react-responsive';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import BottomMenu from '../../components/commons/BottomMenu';
import ButtonMenu from '../../components/commons/ButtonMenu';
import ViewerButtonActions from './ViewerButtonActions';
import ViewerBottomActions from './ViewerBottomActions';

class Action extends React.Component {
  likeAction = async () => {
    const { data, unlikeChapter, likeChapter } = this.props;
    const { liked } = data.chapterViewerInfo;
    const likeAction = liked ? unlikeChapter : likeChapter;

    const { chapterId } = this.props.match.params;

    try {
      await likeAction({
        variables: { chapterId },
      });

      data.refetch();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { readOnly, data } = this.props;
    if (!readOnly || data.loading || data.error) return null;

    const { liked } = data.chapterViewerInfo;

    return (
      <div className="story-page-action-container">
        <MediaQuery query="(max-width: 850px">
          <BottomMenu>
            <ViewerBottomActions liked={liked} likeAction={this.likeAction} />
          </BottomMenu>
        </MediaQuery>
        <MediaQuery query="(min-width: 850px">
          <ButtonMenu>
            <ViewerButtonActions liked={liked} likeAction={this.likeAction} />
          </ButtonMenu>
        </MediaQuery>
      </div>
    );
  }
}

const chapterViewerInfo = gql`
  query chapterViewerInfo($chapterId: ID!) {
    chapterViewerInfo(chapterId: $chapterId) {
      liked
    }
  }
`;

const likeChapter = gql`
  mutation likeChapter($chapterId: ID!) {
    likeResult: likeChapter(chapterId: $chapterId) {
      count
      liked
    }
  }
`;

const unlikeChapter = gql`
  mutation unlikeChapter($chapterId: ID!) {
    likeResult: unlikeChapter(chapterId: $chapterId) {
      count
      liked
    }
  }
`;

export default compose(
  graphql(chapterViewerInfo, {
    options: props => {
      return {
        variables: {
          chapterId: props.match.params.chapterId,
        },
      };
    },
  }),
  graphql(likeChapter, { name: 'likeChapter' }),
  graphql(unlikeChapter, { name: 'unlikeChapter' }),
)(Action);
