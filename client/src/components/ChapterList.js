import './chapterlist/chapterlist.scss';
import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Chapter from './chapterlist/Chapter';
export default class ChapterList extends Component {
  onDragEnd = event => {};

  render() {
    const { title, chapters } = this.props;
    return (
      <div class="chapter-list">
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
                        <Chapter>{title}</Chapter>
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
