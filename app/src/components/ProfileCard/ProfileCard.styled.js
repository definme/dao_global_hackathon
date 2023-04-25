import styled from 'styled-components'

export const CardContainer = styled.div`
  background: #22222e;
  border-radius: 8px;
  width: 290px;
  position: relative;
  overflow: hidden;
  padding: 4px;
  box-sizing: border-box;
`

export const CardImage = styled.img`
  object-fit: contain;
  border-radius: 6px;
`

export const CardInfo = styled.div`
  padding: 20px 20px 24px;
`

export const CardTitle = styled.h2`
  font-family: Open Sans;
  font-size: 20px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0.01em;
  text-align: left;
  margin: 0;
  color: #ffffff;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid rgba(143, 122, 235, 0.1);
`

export const CardText = styled.p`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.01em;
  text-align: left;
  color: #e2e2e2;
  margin: 0;
  margin-bottom: 6px;
`
