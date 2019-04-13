import './chapterlist/chapterlist.scss';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Icon, Image } from 'semantic-ui-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';

import Chapter from './chapterlist/Chapter';
import EmptyChapterList from './chapterlist/EmptyChapterList';

const EmptyChapterMapper = {
  ABOUT_ME: 'Tell us about you',
  STORY: 'Your stories',
  LESSON: 'The lessons',
};

class ChapterList extends Component {
  onDragEnd = ({ source, destination }) => {
    const swapIndexes = [source.index, destination.index];
    const { chapterGroupId } = this.props;
    this.props.reorderChapters(chapterGroupId, ...swapIndexes);
  };

  renderChapters(chapters) {
    const { deleteChapter, type, readOnly } = this.props;
    return (
      <React.Fragment>
        {chapters.map(({ id, title, view, like }, index) => (
          <Draggable key={`${id}`} draggableId={`${id}`} index={index}>
            {(provided, snapshot) => (
              <div
                className="chapter"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Chapter
                  id={id}
                  link={`${id}`}
                  view={view}
                  like={like}
                  deleteChapter={deleteChapter.bind(null, type, id)}
                  title={title}
                />
              </div>
            )}
          </Draggable>
        ))}
      </React.Fragment>
    );
  }

  render() {
    const { title, chapters, type, createChapter, readOnly } = this.props;
    return (
      <div className="chapter-list">
        <div
          className="chapter-list-add-icon"
          onClick={() => createChapter(type)}
        >
          +
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                {_.isEmpty(chapters) ? (
                  <EmptyChapterList text={EmptyChapterMapper[type]} />
                ) : (
                  this.renderChapters(chapters)
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default withRouter(ChapterList);
