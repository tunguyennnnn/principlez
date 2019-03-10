import './chapterlist/chapterlist.scss';
import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';

import Chapter from './chapterlist/Chapter';
import EmptyChapterList from './chapterlist/EmptyChapterList';

const EmptyChapterMapper = {
  ABOUT_ME: 'Tell us about you',
  STORY: 'Your stories',
  LESSON: 'The lessons',
};

export default class ChapterList extends Component {
  onDragEnd = ({ source, destination }) => {
    const swapIndexes = [source.index, destination.index];
    const { chapterGroupId } = this.props;
    this.props.reorderChapters(chapterGroupId, ...swapIndexes);
  };

  renderChapters(chapters) {
    const { basePath, deleteChapter, type } = this.props;
    return (
      <React.Fragment>
        {chapters.map(({ id, title }, index) => (
          <Draggable key={`${id}`} draggableId={`${id}`} index={index}>
            {(provided, snapshot) => (
              <div
                class="chapter box"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Chapter
                  link={`${basePath}/chapters/${id}`}
                  deleteChapter={deleteChapter.bind(null, type, id)}
                >
                  {title}
                </Chapter>
              </div>
            )}
          </Draggable>
        ))}
      </React.Fragment>
    );
  }

  render() {
    const { title, chapters, type, createChapter } = this.props;
    console.log(chapters.map(c => c.id));
    return (
      <div class="chapter-list">
        <div class="chapter-list-add-icon">
          <Icon name="plus" onClick={() => createChapter(type)} />
        </div>
        <div class="chapter-title">{title}</div>
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
