import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const MenuLink = styled(Link)`
  background-color: aliceblue;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  position: relative;
  text-decoration: none;
  color: black;
  background-color: ${({ current }) => {
    if (current === 'true') {
      return 'lightseagreen'
    }
    return ' rgba(0, 0, 0, 0.6) '
  }};
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
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-left: 40px;
  padding-right: 30px;
`

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 40px;

  position: fixed;
  z-index: 20;
`

export const PageContainer = styled.div`
  position: relative;
`
