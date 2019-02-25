import React from 'react';
import Modal from 'react-modal';

export default class EditModal extends React.Component {
  state = {
    modalIsOpen: false,
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    <Modal
      isOpen={this.state.modalIsOpen}
      onAfterOpen={this.afterOpenModal}
      onRequestClose={this.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    />;
  }
}
