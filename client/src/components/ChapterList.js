import './chapterlist/chapterlist.scss';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Icon, Image } from 'semantic-ui-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';

import LogoImage from '../assets/image-medium.png';
import Chapter from './chapterlist/Chapter';
import EmptyChapterList from './chapterlist/EmptyChapterList';

const EmptyChapterMapper = {
  ABOUT_ME: 'Tell us about you',
  STORY: 'Your stories',
  LESSON: 'The lessons',
};

@withRouter
export default class ChapterList extends Component {
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
                className="chapter box common-button"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Chapter
                  link={`${id}`}
                  view={view}
                  like={like}
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

  renderReadOnly() {
    const { title, chapters } = this.props;
    const { url } = this.props.match;
    return (
      <div className="chapter-list">
        {chapters.map(({ id, title, view, like }) => (
          <div className="chapter box" key={`chapter-${id}`}>
            <Chapter
              readOnly
              link={url.replace(/\d+\/view/, `${id}/view`)}
              view={view}
              like={like}
            >
              {title}
            </Chapter>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { title, chapters, type, createChapter, readOnly } = this.props;

    if (readOnly) {
      return this.renderReadOnly();
    }

    return (
      <div className="chapter-list dark-background-container">
        <div className="logo-container common-button">
          <Image src={LogoImage} />
        </div>
        <div className="chapters-container">
          {!readOnly && (
            <div className="chapter-list-add-icon">
              <Icon
                name="plus"
                circular
                className="reverse-color"
                onClick={() => createChapter(type)}
              />
            </div>
          )}
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
      </div>
    );
  }
}
