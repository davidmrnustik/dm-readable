import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const MyModal = ({ isOpen, onRequestClose, style, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={onRequestClose}
      style={style}
      shouldCloseOnEsc={true}>

      {children}

    </Modal>
  )
}

MyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  style: PropTypes.object,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired
}

export default MyModal;