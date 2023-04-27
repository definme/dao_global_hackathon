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
} from './Main.styled'

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
      <MainText>
        To achieve our goals, we used Aragon DAO and ERC721 game tokens. The
        principle of our project is: <br />
        <br />
        - user buys a game character token on the "Marketplace" page using the
        network's native tokens(MATIC) <br />
        <br />- for the purchase of a character, user is credited with a certain
        number of game governance tokens(ELT). The starting number of tokens
        awarded for purchasing a character is 250 ELT. The more characters sold,
        the less governance tokens will be credited for the purchase - this is
        how we encourage our first users. The total balance of governance tokens
        is 10000 ELT, before they are distributed among users, they are stored
        on the "CollectionSale" contract.
        <br />
        <br />- when 7000 ELT are distributed among users, we will enable the
        ability to create promotions with suggestions for improvements in the
        game.
        <br />
        <br />- if the proposal gets enough “yes” votes, then we will take it
        into development and add it to the game!
      </MainText>
      <MainRules>
        Rules for taking proposal:{' '}
        <MainRulesSpan>- 15% participants, - 50% "yes" votes.</MainRulesSpan>
      </MainRules>
      <MainDistributionTitle>
        Token Distribution Graphics:
      </MainDistributionTitle>
      <TableWrapper>
        <MainTable>
          <MainTableHeader>
            <TableHeaderItem first>
              <TableIndicator />I stage
            </TableHeaderItem>
            <TableHeaderItem>II stage</TableHeaderItem>
            <TableHeaderItem>III stage</TableHeaderItem>
            <TableHeaderItem>IV stage</TableHeaderItem>
          </MainTableHeader>
          <MainTableBody>
            <MainTableBodyRow>
              <TableBodyItem first>
                <TableBodySpan>10,000</TableBodySpan> voting tokens
              </TableBodyItem>
              <TableBodyItem top>
                <TableBodySpan>+5,000</TableBodySpan> voting tokens
              </TableBodyItem>
              <TableBodyItem top>
                <TableBodySpan>+2,500</TableBodySpan> voting tokens
              </TableBodyItem>
              <TableBodyItem top>
                <TableBodySpan>+1,000</TableBodySpan> voting tokens
              </TableBodyItem>
            </MainTableBodyRow>
            <MainTableBodyRow>
              <TableBodyItem first withoutAfter>
                For <TableBodySpan>1</TableBodySpan> character you get{' '}
                <TableBodySpan>25</TableBodySpan> tokens
              </TableBodyItem>
              <TableBodyItem bottom withoutAfter>
                For <TableBodySpan>1</TableBodySpan> character you get{' '}
                <TableBodySpan>15</TableBodySpan> tokens
              </TableBodyItem>
              <TableBodyItem bottom withoutAfter>
                For <TableBodySpan>1</TableBodySpan> character you get{' '}
                <TableBodySpan>10</TableBodySpan> tokens
              </TableBodyItem>
              <TableBodyItem bottom withoutAfter>
                For <TableBodySpan>1</TableBodySpan> character you get{' '}
                <TableBodySpan>5</TableBodySpan> tokens
              </TableBodyItem>
            </MainTableBodyRow>
          </MainTableBody>
        </MainTable>
      </TableWrapper>
    </MainContainer>
  )
}

export default Main
