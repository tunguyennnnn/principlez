import React from 'react';
import BlogEditor from '../../components/BlogEditor';

export default class StoryPage extends React.Component {
  render() {
    console.log(this.props);
    const { id: storyId, chapterId } = this.props.match.params;

    console.log(storyId, chapterId);
    return (
      <div>
        <BlogEditor />
      </div>
    );
  }
}
