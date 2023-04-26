import styled from 'styled-components';

export const BuyButton = styled.button`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0.01em;
  text-align: center;
  background: transparent;
  cursor: pointer;
  color: #ff6933;
  padding: 14px 19px 15px;
  border: 1px solid #ff6933;
  border-radius: 8px;
  width: 100%;
  &:hover {
    background-color: #ff6933;
    color: white;

    a {
      color: white;
    }
  }
`;

export const TxLink = styled.a`
  color: #ff6933;
  text-decoration: none;
`;
