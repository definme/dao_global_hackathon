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

export const CheckboxContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  font-family: 'Open Sans';
  color: rgba(255, 255, 255, 0.7);

  .MuiFormControlLabel-label {
    font-family: 'Open Sans';
  }
`

export const Title = styled.h2`
  font-weight: 700;
  font-size: 40px;
  font-family: Open Sans;
  color: white;
  margin: 0;
  margin-bottom: 6px;
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

export const Description = styled.p`
  font-weight: 400;
  font-size: 20px;
  font-family: Open Sans;
  color: white;
  margin: 0;
  margin-bottom: 16px;
`
