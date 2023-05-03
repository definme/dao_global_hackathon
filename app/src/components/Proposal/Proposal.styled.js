import styled from 'styled-components'
import { StyledButton } from '../Button/Button.styled'

export const ProposalContainer = styled.div`
  background: #22222e;
  border-radius: 8px;
  padding: 48px 60px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  @media (max-width: 820px) {
    padding: 24px;
  }
`

export const ProposalInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 24px;
  @media (max-width: 820px) {
    flex-direction: column-reverse;
    gap: 32px;
    padding-bottom: 12px;
  }
`

export const ProposalTitle = styled.h2`
  font-family: Open Sans;
  font-size: 40px;
  font-weight: 700;
  line-height: 54px;
  letter-spacing: 0.01em;
  text-align: left;
  color: #ffffff;
  margin: 0;
  margin-bottom: 16px;
  @media (max-width: 820px) {
    font-size: 28px;
    line-height: 34px;
  }
`

export const ProposalSummary = styled.p`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.01em;
  text-align: left;
  max-width: 900px;
  color: #ffffff;
  margin: 0;
  margin-bottom: 24px;
  @media (max-width: 820px) {
    margin-bottom: 12px;
  }
`

export const ProposalDescriptionText = styled.p`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.01em;
  text-align: left;
  max-width: 900px;
  color: #ffffff;
  margin: 0;
  margin-bottom: 24px;
  @media (max-width: 820px) {
    margin-bottom: 12px;
  }
`

export const ProposalBadge = styled.p`
  font-family: Open Sans;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.01em;
  text-align: center;
  margin: 0;
  color: ${({ status }) => {
    switch (status) {
      case 'Succeeded':
        return '#8F7AEB'
      case 'Active':
        return '#3ec55b'
      default:
        return 'rgba(255, 255, 255, 0.4)'
    }
  }};
  padding: 8px 20px;
  border-radius: 8px;
  background-color: rgba(62, 197, 91, 0.2);
  background-color: ${({ status }) => {
    switch (status) {
      case 'Succeeded':
        return 'rgba(143, 122, 235, 0.2)'
      case 'Active':
        return 'rgba(62, 197, 91, 0.2)'
      default:
        return 'rgba(255, 255, 255, 0.2)'
    }
  }};
  text-transform: uppercase;
  @media (max-width: 820px) {
    align-self: flex-end;
  }
`

export const ProposalDescription = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 32px;

  @media (max-width: 820px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`

export const ProposalAddresses = styled.div`
  display: flex;
  gap: 32px;
  color: #ffffff;
  padding: 24px 48px;
  width: 45%;
  position: relative;
  @media (max-width: 820px) {
    width: 100%;
  }
`

export const ProposalAddress = styled.p`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.01em;
  text-align: left;
  margin: 0;
`

export const ProposalAddressSpan = styled.span`
  font-weight: 600;
  color: #8f7aeb;
`

export const ProposalResults = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  color: #ffffff;
  display: flex;
  padding: 24px 0;
  gap: 32px;
  width: 55%;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    bottom: 12px;
    right: 0;
    top: 12px;
    width: 1px;
    background-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 820px) {
    width: 100%;
    &:before {
      height: 0;
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`

export const ProposalResult = styled.li`
  margin: 0;
  padding: 0;

  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.01em;
  text-align: left;
  color: ${({ isMax }) => (isMax ? '#FF6933' : '#ffffff')};
`

export const ProposalResultSpan = styled.span`
  font-weight: 600;
`

export const ProposalVotingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 820px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
  }
`

export const ProposalVotingInfo = styled.p`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.01em;
  text-align: left;
  margin: 0;
  color: #ffffff;
`

export const ProposalResultPercent = styled.span`
  color: #a7a7ab;
`

export const TxLink = styled.a`
  color: #ff6933;
  text-decoration: none;
`

export const ProposalButton = styled(StyledButton)`
  @media (max-width: 820px) {
    width: 100%;
    max-width: 350px;
    align-self: center;
  }
`

export const ProposalTokenIneligible = styled.div`
  background: linear-gradient(
    148.71deg,
    rgba(255, 125, 79, 0.2) 5.67%,
    rgba(142, 120, 240, 0.2) 97.94%
  );
  color: #e2e2e2;
  position: relative;
  margin-top: 20px;
  font-size: 14px;
  padding: 12px;
  border-radius: 8px;

  text-align: center;
  @media (max-width: 650px) {
    width: auto;
  }
`
