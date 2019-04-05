import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';
import React from 'react';

import Button from '../commons/Button';

export default class ImageEdit extends React.Component {
  state = {
    crop: {
      x: 20,
      y: 10,
      width: 30,
      height: 10,
    },
    pixelCrop: {},
  };

  generateCroppedImage = async (image, pixelCrop) => {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    canvas.toBlob(blob => {
      if (!blob) {
        return;
      }
      blob.name = 'newFile.jpeg';
      this.props.submitImage(blob);
    });
  };

  onChange = (crop, pixelCrop) => {
    this.setState({ crop, pixelCrop });
  };

  submitImage = async event => {
    event.preventDefault();
    const { pixelCrop } = this.state;
    this.generateCroppedImage(this.imageRef, pixelCrop);
  };

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
  };

  render() {
    const { url } = this.props;
    return (
      <div className="image-edit-container">
        <div className="title">Edit image</div>
        <div className="image-editor">
          <ReactCrop
            src={url}
            crop={this.state.crop}
            onChange={this.onChange}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
          />
        </div>
        <div className="submit">
          <Button onClick={this.submitImage}>save</Button>
        </div>
      </div>
    );
  }
}
