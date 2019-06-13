import React from 'react';
import isUrl from 'is-url';
import ReactPlayer from 'react-player';
import _ from 'lodash';

function isYoutubeVideoUrl(source) {
  source = _.trim(source);
  if (!isUrl) {
    return false;
  }
  return /https:\/\/www.youtube.com\/watch\?v=.+/.test(source);
}

function YoutubeHeader(props) {
  const { id, name, source, description } = props;
  return (
    <div className="row">
      <div className="col-lg-8 col-md-12">
        <h2 className="page-header">{name}</h2>
        <small>{description}</small>
      </div>
      <div className="col-lg-4 col-md-12">
        <ReactPlayer
          url={source}
          playing={false}
          width="100%"
          height="100%"
          controls
        />
      </div>
    </div>
  );
}

function LinkHeader(props) {
  const { id, name, source, description } = props;
  return (
    <div className="row">
      <div className="col-lg-8 col-md-12">
        <h2 className="page-header">{name}</h2>
        <small>{description}</small>
      </div>
      <div className="col-lg-4 col-md-12">
        <iframe src={source} />
      </div>
    </div>
  );
}

function NoteSource({ source }) {
  if (!isUrl(source)) {
    return <div>not url</div>;
  }
  return (
    <div>
      <a target="_blank" href={source}>
        {source}
      </a>
    </div>
  );
}

export default class NoteHeader extends React.Component {
  render() {
    const { id, name, source, description } = this.props;
    if (isYoutubeVideoUrl(source)) {
      return <YoutubeHeader {...this.props} />;
    }

    if (isUrl(source)) {
      return <LinkHeader {...this.props} />;
    }
    return (
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <h1 className="page-header">
            {name} <small>{description}</small>
          </h1>
        </div>
        <NoteSource source={source} />
      </div>
    );
  }
}
