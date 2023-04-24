import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function Main() {
  return (
    <Container sx={{ mb: '40px' }}>
      <Box>
        <Typography
          variant='h4'
          component='h1'
          gutterBottom
          sx={{
            m: '40px auto 60px',
            textAlign: 'center',
            fontWeight: 700,
            color: '#FFFFFF',
          }}
        >
          EtherLuxe NFTxDAO
        </Typography>
        <Box
          sx={{
            width: '80%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            m: 'auto',
            mb: '40px',
          }}
        >
          <Typography
            variant='p'
            component='p'
            gutterBottom
            sx={{ fontWeight: 700, color: '#E2E2E2' }}
          >
            Introducing EtherLuxe DAO, allowing players to influence the further
            development of the game!
          </Typography>
          <Typography
            variant='p'
            component='p'
            gutterBottom
            sx={{ fontWeight: 500, lineHeight: '24px', color: '#E2E2E2' }}
          >
            To achieve our goals, we used Aragon DAO and ERC721 game tokens. The
            principle of our project is: <br />
            <br />
            - user buys a game character token on the "Marketplace" page using
            the network's native tokens(MATIC) <br />
            <br />- for the purchase of a character, user is credited with a
            certain number of game governance tokens(ELT). The starting number
            of tokens awarded for purchasing a character is 250 ELT. The more
            characters sold, the less governance tokens will be credited for the
            purchase - this is how we encourage our first users. The total
            balance of governance tokens is 10000 ELT, before they are
            distributed among users, they are stored on the "CollectionSale"
            contract.
            <br />
            <br />- when 7000 ELT are distributed among users, we will enable
            the ability to create promotions with suggestions for improvements
            in the game.
            <br />
            <br />- if the proposal gets enough “yes” votes, then we will take
            it into development and add it to the game!
          </Typography>
          <Typography
            variant='p'
            component='p'
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 500,
              lineHeight: '24px',
              color: '#E2E2E2',
            }}
          >
            Rules for taking proposal:
          </Typography>
          <Typography
            variant='p'
            component='p'
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 500,
              lineHeight: '24px',
              color: '#E2E2E2',
            }}
          >
            - 15% participants <br /> - 50% "yes" votes
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default Main
