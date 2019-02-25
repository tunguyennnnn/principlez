import './imageupload/imageupload.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

export default class ImageUpload extends React.Component {
  static propTypes = {
    round: PropTypes.bool,
    width: PropTypes.number,
  };

  onDrop = ([file]) => {
    console.log(file);
  };

  getStyle() {
    const { round, width } = this.props;
    const style = {};
    if (round && width) {
      style.width = style.height = width;
      style.borderRadius = '100%';
      style.backgroundImage = `url("https://cdn4.iconfinder.com/data/icons/social-communication/142/add_photo-512.png")`;
    }
    return style;
  }

  render() {
    const { round } = this.props;
    return (
      <Dropzone accept="image/*" multiple={false} onDrop={this.onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => {
          return (
            <div
              {...getRootProps()}
              class="image-upload-container"
              style={this.getStyle()}
            >
              <input {...getInputProps()} />
              {!round && <p>Click or Drag to Add Image</p>}
            </div>
          );
        }}
      </Dropzone>
    );
  }
}
