import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const MenuLink = styled(Link)`
  text-transform: uppercase;
  display: flex;
  align-items: center;
  position: relative;
  text-decoration: none;
  color: white;
  color: ${({ current }) => {
    if (current === 'true') {
      return 'white'
    }
    return ' lightseagreen '
  }};
  font-size: 22px;
  font-style: italic;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 13px;
  text-align: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: ${({ current }) => {
      if (current === 'true') {
        return '1px'
      }
      return '0'
    }};
    z-index: 1;
    background: lightseagreen;
  }
`

export const MenuContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-grow: 1;
  margin-left: 100px;
`

export const LogoLink = styled(Link)`
  color: white;
  cursor: pointer;
  text-decoration: none;
  font-size: 24px;
  font-weight: 500;
`
