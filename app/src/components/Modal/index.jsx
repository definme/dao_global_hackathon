import React, { useEffect, useCallback, useRef } from 'react';
import { Close, Modal, ModalContainer } from './Modal.styled';
import CloseIcon from '@mui/icons-material/Close';

export default function ModalComponent({ isOpen, onClose, children }) {
  const modal = useRef(null);

  const handleOverlayClose = useCallback((event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (modal.current) {
      modal.current.addEventListener('click', handleOverlayClose);
    }
    return () => {
      if (modal.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        modal.current.removeEventListener('click', handleOverlayClose);
      }
    };
  }, [handleOverlayClose]);

  return (
    <Modal isOpen={isOpen} ref={modal}>
      <ModalContainer>
        {children}
        <Close onClick={onClose}>
          <CloseIcon sx = {{color: 'white', fontSize: '32px'}}  />
        </Close>
      </ModalContainer>
    </Modal>
  );
}
