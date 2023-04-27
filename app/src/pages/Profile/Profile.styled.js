import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ProfileContainer = styled.div`
  max-width: 1272px;
  margin: 88px auto 120px;
  padding: 0 24px;
  width: 100%;
  box-sizing: border-box;
`

export const ProfileTitle = styled.h1`
  font-family: Open Sans;
  font-size: 40px;
  font-weight: 700;
  line-height: 54px;
  letter-spacing: 0.01em;
  text-align: center;
  color: #ffffff;
  margin: 0;
  margin-bottom: 30px;
`

export const ProfileBalances = styled.div`
  max-width: 786px;
  display: flex;
  gap: 24px;
  margin: auto;
  margin-bottom: 60px;

  @media (max-width: 820px) {
    flex-direction: column;
    align-items: center;
  }
`

export const ProfileBalanceItem = styled.div`
  background: #22222e;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 34px 32px 30px;
  display: flex;
  gap: 24px;
  align-items: flex-start;
  max-width: 420px;
`

export const ProfileBalanceWrapper = styled.div``

export const ProfileBalanceAmount = styled.p`
  font-family: Open Sans;
  font-size: 24px;
  font-weight: 300;
  line-height: 33px;
  letter-spacing: 0.01em;
  text-align: left;
  margin: 0;
  color: #ffffff;
`

export const ProfileBalanceName = styled.p`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0.01em;
  text-align: left;
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
`

export const ProfileBalanceAmountSpan = styled.span`
  font-weight: 600;
`

export const ProfileBalanceImageContainer = styled.div`
  background: linear-gradient(
    148.71deg,
    rgba(203, 191, 255, 0.2) 5.67%,
    rgba(143, 122, 235, 0.2) 97.94%
  );
  background: ${({ elt }) =>
    elt
      ? 'linear-gradient(148.71deg, rgba(255, 125, 79, 0.2) 5.67%, rgba(142, 120, 240, 0.2) 97.94%);'
      : 'linear-gradient(148.71deg,rgba(203, 191, 255, 0.2) 5.67%,rgba(143, 122, 235, 0.2) 97.94%)'};
  padding: 12px 10px 9px;
  padding: ${({ elt }) => (elt ? '6px 15px' : '12px 10px 9px')};
  border-radius: 8px;
`

export const ProfileInfo = styled.div`
  max-width: 786px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
`

export const ProfileInfoTitle = styled.h2`
  font-family: Open Sans;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 0.01em;
  text-align: center;
  color: #ffffff;
  margin: 0;
  margin-bottom: 16px;
`

export const ProfileInfoSubtitle = styled.p`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0.01em;
  text-align: center;
  color: #ffffff;
  margin: 0;
  margin-bottom: 32px;
  max-width: 380px;
`

export const ProfileInfoButton = styled(Link)`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0.01em;
  text-align: center;

  color: #ff6933;
  padding: 14px 27px 15px;
  border: 1px solid #ff6933;
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.5s ease-in-out;

  &:hover {
    opacity: 0.7;
    box-shadow: inset 0 0 15px 0 #ff6933;
  }
`
