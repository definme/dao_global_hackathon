import styled from 'styled-components';

export const MainContainer = styled.div`
  max-width: 840px;
  margin: 70px auto 120px;
  padding: 0 24px;
  width: 100%;
  box-sizing: border-box;
`;

export const MainTitleContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  margin-bottom: 65px;
`;

export const MainTitle = styled.h1`
  font-family: Open Sans;
  font-size: 40px;
  font-weight: 700;
  line-height: 54px;
  letter-spacing: 0.01em;
  text-align: left;
  color: #ffffff;
  margin: 0;
`;

export const MainTitleSpan = styled.span`
  font-weight: 300;
`;

export const MainTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MainSubtitle = styled.p`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0.01em;
  text-align: left;
  color: #e2e2e2;
  margin: 0;
  max-width: 514px;
`;

export const MainText = styled.p`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0.01em;
  text-align: left;
  color: #e2e2e2;
  margin-bottom: 23px;
`;

export const MainRules = styled.p`
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0.01em;
  text-align: left;
  color: #e2e2e2;
  background: #22222e;
  padding: 15px 20px;
  width: max-content;
  border-radius: 2px;
  margin: 0;
  margin-bottom: 48px;
  word-wrap: break-word;

  @media (max-width: 650px) {
    width: auto;
  }
`;

export const Banner = styled.div`
  background: #22222e;
  color: #e2e2e2;
  position: relative;
  margin-top: -30px;
  margin-bottom: 50px;
  padding: 15px 20px 25px 20px;
  border-radius: 8px;
  font-size: 22px;
  @media (max-width: 650px) {
    width: auto;
  }
`;

export const BannerLink = styled.a`
  color: rgb(255, 105, 51);
  font-weight: 800;
  align-items: center;
  line-height: 55px;
`;

export const BannerLogo = styled.img`
  border-radius: 8px;
  position: absolute;
  right: 15px;
  bottom: 15px;
  width: 40px;
`;

export const MainRulesSpan = styled.span`
  font-weight: 700;
`;

export const MainDistributionTitle = styled.h2`
  font-family: Open Sans;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 0.01em;
  text-align: left;
  color: #ffffff;
  margin: 0;
  margin-bottom: 18px;
`;

export const TableWrapper = styled.div`
  @media (max-width: 650px) {
    overflow-x: scroll;
    max-width: 100%;
    box-sizing: border-box;
  }
`;

export const MainTable = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  min-width: 450px;
`;

export const MainTableHeader = styled.div`
  background: #22222e;
  padding: 12px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export const MainTableBody = styled.div`
  color: #ffffff;
`;

export const TableHeaderItem = styled.div`
  position: relative;
  padding: 14px;
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.01em;
  text-align: center;
  color: #ffffff;
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    top: 0;
    width: ${({ first }) => (first ? '0px' : '1px')};
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const TableBodyItem = styled.div`
  display: ${({ first }) => (first ? 'block' : 'flex')};
  align-items: center;
  justify-content: center;
  padding: 16px;
  position: relative;
  font-family: Open Sans;
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0.01em;
  text-align: ${({ first }) => (first ? 'left' : 'center')};

  &:before {
    content: '';
    position: absolute;
    bottom: ${({ bottom }) => (bottom ? '10px' : '0px')};
    left: 0;
    top: ${({ top }) => (top ? '10px' : '0px')};
    width: ${({ first }) => (first ? '0px' : '1px')};
    background-color: rgba(255, 255, 255, 0.1);
  }
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${({ withoutAfter }) => (withoutAfter ? '0px' : '1px')};
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 650px) {
    font-size: 12px;
  }
`;

export const MainTableBodyRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export const TableBodySpan = styled.span`
  font-weight: 700;
`;

export const TableIndicator = styled.span`
  display: inline-block;
  background: #ff6933;
  border-radius: 50%;
  width: 11px;
  height: 11px;
  margin-right: 8px;
`;

export const MainLogo = styled.img`
  @media (max-width: 650px) {
    width: 63px;
    height: 92px;
  }
`;
