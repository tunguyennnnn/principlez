import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';
import React from 'react';
import { resolve } from 'q';

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
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        console.log(blob);
      });
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
      <div>
        <div>Edit image</div>
        <ReactCrop
          src={url}
          crop={this.state.crop}
          onChange={this.onChange}
          onImageLoaded={this.onImageLoaded}
          onComplete={this.onCropComplete}
        />
        <div>
          <button onClick={this.submitImage}>save</button>
        </div>
      </div>
    );
  }
}
