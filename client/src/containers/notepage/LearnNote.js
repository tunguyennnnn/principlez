import React from 'react';
import BlogEditor from '../../components/BlogEditor';

export default function LearnNote(props) {
  const { updateLearnNote } = props;
  const { body } = props.learnNote;
  return (
    <div className={`story-write-containter`}>
      <BlogEditor body={body} noTitle update={body => updateLearnNote(body)} />
    </div>
  );
}
