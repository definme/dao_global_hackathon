import {
  MainContainer,
  MainTitleContainer,
  MainTitle,
  MainTitleSpan,
  MainTitleWrapper,
  MainSubtitle,
  MainText,
  MainRules,
  MainRulesSpan,
  MainDistributionTitle,
  MainTable,
  MainTableHeader,
  MainTableBody,
  TableBodyItem,
  TableHeaderItem,
  MainTableBodyRow,
  TableBodySpan,
  TableIndicator,
  TableWrapper,
  MainLogo,
  Banner,
  BannerLink,
  BannerLogo,
} from './Main.styled';

function Main() {
  return (
    <MainContainer>
      <MainTitleContainer>
        <MainLogo
          src={require('../../images/Logo.png')}
          alt='logo'
          width='126px'
          height='184px'
        />
        <MainTitleWrapper>
          <MainTitle>
            Ether<MainTitleSpan>Luxe</MainTitleSpan> NFTxDAO
          </MainTitle>
          <MainSubtitle>
            Introducing EtherLuxe DAO, allowing players to influence the further
            development of the game!
          </MainSubtitle>
        </MainTitleWrapper>
      </MainTitleContainer>
      <Banner>
        Note: to get all updates on voting rounds, please also sign in{' '}
        <BannerLink
          href='https://mailchain.com/'
          target='_blank'
          rel='noreferrer'>
          MailChain
        </BannerLink>{' '}
        with your ethereum address.
        <BannerLogo src={require('../../images/mailchain.png')}></BannerLogo>
      </Banner>
      <MainText>
        We use Aragon DAO and ERC721 game tokens. The concept of our project is:{' '}
        <br />
        <br />
        - user buys a game character token on the "Marketplace" page using the
        network's native tokens (MATIC) <br />
        <br />- user is credited with a certain number of game governance tokens
        (ELT) for the purchase of a character. The starting number of tokens
        awarded for purchasing a character is 25 ELT. The more characters sold,
        the less governance tokens will be credited for the purchase — this is
        how we encourage our first users. The total balance of governance tokens
        is changed on every round, before they are distributed among users, they
        are stored on the "CollectionSale" contract.
        <br />
        <br />- when distribution of round tokens among users is reached we
        enable the ability to create promotions with suggestions for
        improvements
        <br />
        <br />- if the proposal gets enough votes then we will take it into
        development and add it to the game!
      </MainText>
      <MainRules>
        Needed quorum:{' '}
        <MainRulesSpan>35%, 50% of them should be "yes" votes.</MainRulesSpan>
      </MainRules>
      <MainDistributionTitle>
        Token Distribution Graphics:
      </MainDistributionTitle>
      <TableWrapper>
        <MainTable>
          <MainTableHeader>
            <TableHeaderItem first>Round</TableHeaderItem>
            <TableHeaderItem>
              <TableIndicator />
              Initial state
            </TableHeaderItem>
            <TableHeaderItem>First round</TableHeaderItem>
            <TableHeaderItem>Second round</TableHeaderItem>
          </MainTableHeader>
          <MainTableBody>
            <MainTableBodyRow>
              <TableBodyItem first>Tokens given per NFT purchase</TableBodyItem>
              <TableBodyItem top>
                <TableBodySpan>25</TableBodySpan>
              </TableBodyItem>
              <TableBodyItem top>
                <TableBodySpan>15</TableBodySpan>
              </TableBodyItem>
              <TableBodyItem top>
                <TableBodySpan>5</TableBodySpan>
              </TableBodyItem>
            </MainTableBodyRow>
            <MainTableBodyRow>
              <TableBodyItem first>Total supply</TableBodyItem>
              <TableBodyItem>
                <TableBodySpan>151</TableBodySpan>
              </TableBodyItem>
              <TableBodyItem>
                <TableBodySpan>302</TableBodySpan>
              </TableBodyItem>
              <TableBodyItem>
                <TableBodySpan>453</TableBodySpan>
              </TableBodyItem>
            </MainTableBodyRow>
            <MainTableBodyRow>
              <TableBodyItem first>
                Admin balance at the start of round
              </TableBodyItem>
              <TableBodyItem>
                <TableBodySpan>51</TableBodySpan>
              </TableBodyItem>
              <TableBodyItem>
                <TableBodySpan>51</TableBodySpan>
              </TableBodyItem>
              <TableBodyItem>
                <TableBodySpan>51</TableBodySpan>
              </TableBodyItem>
            </MainTableBodyRow>
            <MainTableBodyRow>
              <TableBodyItem first>
                SaleContract balance at the start of round
              </TableBodyItem>
              <TableBodyItem>
                <TableBodySpan>100</TableBodySpan>
              </TableBodyItem>
              <TableBodyItem>
                <TableBodySpan>150</TableBodySpan>
              </TableBodyItem>
              <TableBodyItem>
                <TableBodySpan>226</TableBodySpan>
              </TableBodyItem>
            </MainTableBodyRow>
            <MainTableBodyRow>
              <TableBodyItem first>
                Invariant value at the start of round
              </TableBodyItem>
              <TableBodyItem>
                <TableBodySpan>3775</TableBodySpan>
              </TableBodyItem>
              <TableBodyItem>
                <TableBodySpan>4530</TableBodySpan>
              </TableBodyItem>
              <TableBodyItem>
                <TableBodySpan>2265</TableBodySpan>
              </TableBodyItem>
            </MainTableBodyRow>
            <MainTableBodyRow>
              <TableBodyItem first>Approximated users count</TableBodyItem>
              <TableBodyItem>
                <TableBodySpan>4</TableBodySpan>
              </TableBodyItem>
              <TableBodyItem>
                <TableBodySpan>10</TableBodySpan>
              </TableBodyItem>
              <TableBodyItem>
                <TableBodySpan>45.2</TableBodySpan>
              </TableBodyItem>
            </MainTableBodyRow>
            <MainTableBodyRow>
              <TableBodyItem first>
                Minted governance tokens for the next round
              </TableBodyItem>
              <TableBodyItem bottom>
                <TableBodySpan>151</TableBodySpan>
              </TableBodyItem>
              <TableBodyItem bottom>
                <TableBodySpan>151</TableBodySpan>
              </TableBodyItem>
              <TableBodyItem bottom>
                <TableBodySpan></TableBodySpan>
              </TableBodyItem>
            </MainTableBodyRow>
          </MainTableBody>
        </MainTable>
      </TableWrapper>
    </MainContainer>
  );
}

export default Main;
