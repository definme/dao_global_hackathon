import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 24px;
`;

export const Vote = styled.input`
  all: unset;
  font-size: 17px;
  text-transform: uppercase;
  border: ${({ active }) => {
    if (active) {
      return '1px solid #8F7AEB';
    }
    return '1px solid rgba(255, 255, 255, 0.2)';
  }};
  color: ${({ active }) => {
    if (active) {
      return '#8F7AEB';
    }
    return 'rgba(255, 255, 255, 0.5)';
  }};
  width: 155px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  border-radius: 8px;
  cursor: pointer;
`;
