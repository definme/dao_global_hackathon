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
  display: flex;
  justify-content: space-between;
  gap: 24px;
  @media (max-width: 820px) {
    flex-direction: column;
    align-items: center;
  }
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
