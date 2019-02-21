import './chapterlist/chapterlist.scss';
import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default class ChapterList extends Component {
  onDragEnd = event => {};

  render() {
    const { title, chapters } = this.props;
    return (
      <div class="chapter-list">
        <div class="chapter-title">{title}</div>
        <DragDropContext onDragEnd={this.onDragEnd} class="chapters">
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                {chapters.map(({ id, title }, index) => (
                  <Draggable key={`${id}`} draggableId={`${id}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {title}
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
