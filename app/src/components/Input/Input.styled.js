import styled from 'styled-components';

export const StyledInput = styled.input`
  border: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 17px;
  border-radius: 8px;
  font-weight: 400;
  line-height: 17px;
  padding: 13px;
  background: transparent;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  font-family: 'Open Sans';

  color: white;
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

export const InputError = styled.span`
  color: red;
  font-size: 12px;
  text-transform: lowercase;
  min-height: 14px;
  display: block;
  margin: 5px 0;
`;

export const InputLabel = styled.label`
  color: white;
`;

export const TextArea = styled.textarea`
  resize: none;
  outline: none;
  font-family: 'Open Sans';
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  width: calc(100% - 20px);
  padding: 10px;
  color: white;
  font-size: 17px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;
