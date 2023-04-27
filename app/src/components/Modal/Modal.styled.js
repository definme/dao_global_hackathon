import styled from 'styled-components';

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
      return 'visible';
    }
    return 'hidden';
  }};
  opacity: ${({ isOpen }) => {
    if (isOpen) {
      return '1';
    }
    return '0';
  }};
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #22222e;
  backdrop-filter: blur(10px);

  padding: 40px;
  position: relative;
  border-radius: 8px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    max-width: 70%;
    border-radius: 12px;
    padding: 24px;
  }
`;

export const Close = styled.div`
  cursor: pointer;
  border-radius: 8px;
  background: #22222e;
  position: absolute;
  top: 0;
  right: -70px;
  padding: 10px;
  @media (max-width: 510px) {
    top: -70px;
    right: 0;
  }
`;
