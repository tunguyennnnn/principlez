import './chapterlist/chapterlist.scss';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Icon, Image } from 'semantic-ui-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';

import Chapter from './chapterlist/Chapter';

class ChapterList extends Component {
  onDragEnd = ({ source, destination }) => {
    const swapIndexes = [source.index, destination.index];
    const { chapterGroupId } = this.props;
    this.props.reorderChapters(chapterGroupId, ...swapIndexes);
  };

  renderChapters(chapters) {
    const { deleteChapter, type } = this.props;
    return (
      <React.Fragment>
        {chapters.map(({ id, title, view, like }, index) => (
          <Draggable key={`${id}`} draggableId={`${id}`} index={index}>
            {(provided, snapshot) => (
              <div
                className="chapter"
                key={`write-chapter-${id}`}
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

  renderReadOnly() {
    const { chapters, forceParentUpdate, mobile } = this.props;
    return (
      <div className="chapter-list">
        {chapters.map(({ id, title, view, like }, index) => (
          <div className="chapter" key={`view-chapter-${id}`}>
            <Chapter
              forceParentUpdate={forceParentUpdate}
              id={id}
              readOnly
              mobile={mobile}
              link={`${id}`}
              view={view}
              like={like}
              title={title}
            />
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { chapters, createChapter, readOnly } = this.props;

    if (readOnly) {
      return this.renderReadOnly();
    }
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
              <div ref={provided.innerRef}>{this.renderChapters(chapters)}</div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default withRouter(ChapterList);
