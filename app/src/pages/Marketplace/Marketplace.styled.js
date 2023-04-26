import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MenuLink = styled(Link)`
  background-color: aliceblue;
  display: flex;
  align-items: center;
  position: relative;
  text-decoration: none;
  color: black;
  opacity: ${({ current }) => {
    if (current === 'true') {
      return '1';
    }
    return ' 0.2';
  }};
  background: transparent;
  color: white;
  border: ${({ current }) => {
    if (current === 'true') {
      return '1px solid rgb(143, 122, 235)';
    }
    return ' lightseagreen ';
  }};
  font-size: 22px;
  line-height: 40px;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 13px 40px 13px 40px;
  text-align: center;
  border-radius: 8px;
`;

export const MenuContainer = styled.div`
  display: flex;
  gap: 8px;
  margin: 120px 0;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  width: max-content;
`;

export const PageContainer = styled.div`
  position: relative;
`;
