import styled from 'styled-components'

export const StyledButton = styled.button`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0.01em;
  text-align: center;

  color: #ff6933;
  padding: 14px 19px 15px;
  border: 1px solid #ff6933;
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  width: 100%;
  max-width: 228px;

  &:hover {
    background-color: #ff6933;
    color: white;

    a {
      color: white;
    }
  }

  &:disabled,
  &[disabled] {
    cursor: not-allowed;
    border: 1px solid rgba(255, 255, 255, 0.4);
    color: rgba(255, 255, 255, 0.4);
  }

  &:disabled&:hover,
  &[disabled]&:hover {
    background-color: transparent;
    color: rgba(255, 255, 255, 0.4);
  }
`
