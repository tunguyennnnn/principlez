import './chapterlist/chapterlist.scss';
import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Chapter from './chapterlist/Chapter';
export default class ChapterList extends Component {
  onDragEnd = event => {};

  render() {
    const {
      title,
      chapters,
      basePath,
      type,
      createChapter,
      deleteChapter,
    } = this.props;
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
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
