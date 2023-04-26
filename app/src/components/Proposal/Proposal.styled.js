import styled from 'styled-components'

export const ProposalContainer = styled.div`
  background: #22222e;
  border-radius: 8px;
  padding: 48px 60px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`

export const ProposalInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
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
  margin-bottom: 48px;
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
`

export const ProposalDescription = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 32px;
`

export const ProposalAddresses = styled.div`
  display: flex;
  gap: 32px;
  color: #ffffff;
  padding: 24px 0;
  width: 100%;
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
  padding: 24px 52px;
  gap: 32px;
  width: 100%;
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
`

export const ProposalResultSpan = styled.span`
  font-weight: 600;
`

export const ProposalVotingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
