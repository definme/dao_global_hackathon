import styled from 'styled-components'

export const Modal = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(29, 31, 42, 0.9);
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 100;
  opacity: 0;
  transition: visibility 0.5s, opacity 0.5s ease;
  visibility: ${({ isOpen }) => {
    if (isOpen) {
      return 'visible'
    }
    return 'hidden'
  }};
  opacity: ${({ isOpen }) => {
    if (isOpen) {
      return '1'
    }
    return '0'
  }};
`

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 477px;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);

  padding: 40px;
  position: relative;
  border-radius: 20px;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  @media (max-width: 768px) {
    max-width: 336px;
    border-radius: 12px;
    padding: 24px;
  }
`
