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
