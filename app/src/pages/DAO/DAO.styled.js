import styled from 'styled-components'

export const DAOContainer = styled.div`
  margin: 88px auto 120px;
  max-width: 1200px;
  width: 100%;
  padding: 0 24px;
  width: 100%;
  box-sizing: border-box;
`

export const DAOInfo = styled.div`
  background: #22222e;
  border-radius: 8px;
  padding: 48px 60px;
  margin-bottom: 60px;
`

export const DAOInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  align-items: center;
  @media (max-width: 820px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
`

export const DAOInfoNameContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
`
export const DAOInfoNameTitle = styled.h2`
  font-family: Open Sans;
  font-size: 40px;
  font-weight: 700;
  line-height: 54px;
  letter-spacing: 0.01em;
  text-align: left;
  color: #ffffff;
  margin: 0;

  @media (max-width: 820px) {
    font-size: 32px;
    line-height: 36px;
  }
`

export const DAOLink = styled.a`
  color: #8f7aeb;
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.01em;
  text-align: left;
  text-decoration: none;
`
export const DAOInfoTextContainer = styled.div``
export const DAOInfoLinkContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 820px) {
    align-self: flex-start;
  }
`
export const DAOImg = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 8px;
  @media (max-width: 820px) {
    width: 44px;
    height: 44px;
  }
`

export const DAOAddressLink = styled.span`
  color: #8f7aeb;

  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.01em;
  text-align: left;
`

export const DAOShareButton = styled.a`
  text-decoration: none;
  padding: 9px 9px 8px 11px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
`

export const DAODescription = styled.p`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.01em;
  text-align: left;
  margin: 0;
  color: #ffffff;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 43px;
`

export const DAOPromoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 820px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
  }
`

export const DAOPromoText = styled.p`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.01em;
  text-align: left;
  color: #ffffff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 13px;
`

export const DAOATokenLink = styled.a`
  color: #8f7aeb;
  text-decoration: none;
  font-weight: 600;
`

export const DAOBalanceImageContainer = styled.span`
  display: inline-block;
  background: linear-gradient(
    148.71deg,
    rgba(255, 125, 79, 0.2) 5.67%,
    rgba(142, 120, 240, 0.2) 97.94%
  );
  line-height: 0;
  padding: 4px 9px 4px 10px;
  border-radius: 8px;
`

export const DAOSubtitle = styled.h3`
  font-family: Open Sans;
  font-size: 24px;
  font-weight: 600;
  line-height: 33px;
  letter-spacing: 0.01em;
  text-align: center;
  color: #ffffff;
  margin: 0;
  margin-bottom: 32px;
`

export const DAOImageContainer = styled.div`
  background: linear-gradient(
    148.71deg,
    rgba(255, 125, 79, 0.2) 5.67%,
    rgba(142, 120, 240, 0.2) 97.94%
  );
  line-height: 0;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 820px) {
    width: 100%;
    max-width: 44px;
  }
`
