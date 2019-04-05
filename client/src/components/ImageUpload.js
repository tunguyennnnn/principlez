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

function ImageViewMode({ imageUrl, open, getInputProps }) {
  return (
    <React.Fragment>
      <input {...getInputProps()} />
      <img src={imageUrl} />
      <label className="edit-button" type="button" onClick={() => open()} />
    </React.Fragment>
  );
}

function ImageEditMode({ getInputProps }) {
  return <input {...getInputProps()} />;
}

export default class ImageUpload extends React.Component {
  static propTypes = {
    round: PropTypes.bool,
    width: PropTypes.number,
    imageUrl: PropTypes.string,
    uploadImage: PropTypes.func,
  };

  state = {
    modalIsOpen: false,
    blobUrl: '',
  };

  onDrop = ([file]) => {
    this.props.uploadImage(file);
    // const blobUrl = URL.createObjectURL(file);
    // this.setState({ modalIsOpen: true, blobUrl });
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
    this.props.uploadImage(blob);
    this.closeModal();
  };

  renderDescription() {
    const { round, imageUrl } = this.props;
    if (round || imageUrl) return null;
    return <p>Click or Drag to Add Image</p>;
  }

  renderDropZoneBody({ getInputProps, open }) {
    const { imageUrl } = this.props;
    if (!imageUrl) {
      return <ImageEditMode getInputProps={getInputProps} />;
    }

    return (
      <ImageViewMode
        imageUrl={imageUrl}
        open={open}
        getInputProps={getInputProps}
      />
    );
  }

  render() {
    const { round, imageUrl } = this.props;
    const { modalIsOpen, blobUrl } = this.state;

    const hasImage = !!imageUrl;
    return (
      <div>
        <Dropzone
          accept="image/*"
          multiple={false}
          onDrop={this.onDrop}
          maxSize={1048576 * 3}
        >
          {({ getRootProps, getInputProps, open }) => {
            window.openFile = open;
            return (
              <div
                {...getRootProps({ onClick: evt => evt.preventDefault() })}
                className={`image-upload-container ${hasImage && 'with--image'}`}
                style={this.getStyle()}
              >
                {this.renderDropZoneBody({ getInputProps, open })}
                {this.renderDescription()}
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
