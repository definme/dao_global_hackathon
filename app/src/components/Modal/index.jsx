import React, { useEffect, useCallback, useRef } from 'react'
import { Modal, ModalContainer } from './Modal.styled'

export default function ModalComponent({ isOpen, onClose, children }) {
  const modal = useRef(null)

  const handleOverlayClose = useCallback(event => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }, [])

  useEffect(() => {
    if (modal.current) {
      modal.current.addEventListener('click', handleOverlayClose)
    }
    return () => {
      if (modal.current) {
        modal.current.removeEventListener('click', handleOverlayClose)
      }
    }
  }, [handleOverlayClose])

  return (
    <Modal isOpen={isOpen} ref={modal}>
      <ModalContainer>{children}</ModalContainer>
    </Modal>
  )
}
