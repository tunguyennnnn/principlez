import './imageupload/imageupload.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import Modal from 'react-modal';
import ImageEdit from './imageupload/ImageEdit';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '5%',
    left: '5%',
    right: '5%',
    bottom: '5%',
  },
};

export default class ImageUpload extends React.Component {
  static propTypes = {
    round: PropTypes.bool,
    width: PropTypes.number,
  };

  state = {
    modalIsOpen: false,
    blobUrl: '',
    previewImageUrl: '',
  };

  onDrop = ([file]) => {
    const blobUrl = URL.createObjectURL(file);
    this.setState({ modalIsOpen: true, blobUrl });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false, blobUrl: '' });
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

  submitImage = blob => {
    this.setState({ previewImageUrl: URL.createObjectURL(blob) });
    this.closeModal();
  };

  render() {
    const { round } = this.props;
    const { modalIsOpen, blobUrl, previewImageUrl } = this.state;
    console.log(previewImageUrl);
    return (
      <div>
        {previewImageUrl && <img src={previewImageUrl} />}
        <Dropzone
          accept="image/*"
          multiple={false}
          onDrop={this.onDrop}
          maxSize={1048576 * 3}
        >
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
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          {blobUrl && modalIsOpen && (
            <ImageEdit url={blobUrl} submitImage={this.submitImage} />
          )}
        </Modal>
      </div>
    );
  }
}
