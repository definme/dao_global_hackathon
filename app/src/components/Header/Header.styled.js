import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export const MenuLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  color: ${({ current }) => {
    if (current === 'true') {
      return 'white';
    }
    return 'rgba(255, 255, 255, 0.6)';
  }};
  font-size: 17px;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 1%;
  cursor: pointer;
  padding: 33px 20px 31px;
  text-align: center;

  &:after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: ${({ current }) => {
      if (current === 'true') {
        return '2px';
      }
      return '0';
    }};
    z-index: 1;
    background: #8f7aeb;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    background: ${({ current }) => {
      if (current === 'true') {
        return 'linear-gradient(180deg, rgba(37, 33, 33, 0) 0%, rgba(143, 122, 235, 0.18) 91.11%);';
      }
      return 'transparent';
    }};
    z-index: 1;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

export const LogoLink = styled(Link)`
  color: white;
  cursor: pointer;
  text-decoration: none;
  font-size: 24px;
  font-weight: 500;
  display: flex;
  gap: 12px;
  align-items: center;
  width: max-content;
`;

export const LogoFirstName = styled.span`
  font-family: Open Sans;
  font-size: 24px;
  font-weight: 600;
  line-height: 33px;
  letter-spacing: 0.01em;
  text-align: center;
`;

export const LogoSecondName = styled.span`
  font-family: Open Sans;
  font-size: 24px;
  font-weight: 300;
  line-height: 33px;
  letter-spacing: 0.01em;
  text-align: center;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1328px;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 24px;
`;

export const MainHeader = styled.header`
  background: #22222e;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const BalanceFirstName = styled.span`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0.01em;
  text-align: center;
  color: white;
`;

export const BalanceSecondName = styled.span`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 300;
  line-height: 23px;
  letter-spacing: 0.01em;
  text-align: center;
  color: white;
`;

export const AddressContainer = styled.p`
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
`;

export const ConnectButton = styled.button`
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

  &:hover {
    opacity: 0.7;
    box-shadow: inset 0 0 15px 0 #ff6933;
  }
`;

export const MenuBurger = styled(MenuIcon)`
  color: white;
  cursor: pointer;
  font-size: 34px !important;
`;

export const LogoName = styled.p`
  @media (max-width: 872px) {
    display: none;
  }
  @media (max-width: 741px) {
    display: unset;
  }
`;

export const HeaderDrawer = styled(Drawer)`
  img {
    padding: 20px;
  }
  .MuiPaper-root {
    background-color: #22222e;
    width: 100%;
  }
  div {
    flex-direction: column;
    justify-content: unset;
  }
`;

export const CloseDrawer = styled(CloseIcon)`
  color: white;
  top: 28px;
  right: 30px;
  position: absolute;
  font-size: 34px !important;
  cursor: pointer;
`;

