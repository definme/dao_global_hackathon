import styled from 'styled-components'
import { StyledButton } from '../Button/Button.styled'

export const BuyProposalButton = styled(StyledButton)`
  width: max-content;
  padding-left: 40px;
  padding-right: 40px;
  text-transform: uppercase;
`

export const TxLink = styled.a`
  color: #ff6933;
  text-decoration: none;
`

export const Title = styled.h2`
  font-weight: 700;
  font-size: 40px;
  font-family: Open Sans;
  color: white;
  margin: 0;
  margin-bottom: 24px;
  @media (max-width: 820px) {
    font-size: 26px;
  }
`

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  @media (max-width: 820px) {
    gap: 0;
  }
`
