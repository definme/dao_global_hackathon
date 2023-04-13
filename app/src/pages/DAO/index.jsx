import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Client } from '@aragon/sdk-client'
import { context } from '../../contexts/DAOContext'

function DAO() {
  const client = new Client(context)
  const daoAddressOrEns = '0x1234567890123456789012345678901234567890'

  async function getDao() {
    const dao = await client.methods.getDao(daoAddressOrEns)
    console.log({ dao })
  }

  getDao()

  return (
    <Container sx={{ mb: '40px' }}>
      <Box>
        <Typography
          variant='h4'
          component='h1'
          gutterBottom
          sx={{ m: '40px auto 60px', textAlign: 'center', fontWeight: 700 }}
        >
          EtherLuxe DAO
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            mb: '40px',
          }}
        >
          <Typography
            variant='p'
            component='p'
            gutterBottom
            sx={{ m: '10px', textAlign: 'center', fontWeight: 700 }}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi non
            magnam perspiciatis perferendis veniam nam, aut alias ab debitis
            fugiat. Esse assumenda, aliquam eum quos ducimus perspiciatis
            similique temporibus tempora! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Delectus, repudiandae velit voluptatem iusto
            magnam, repellat deserunt dolorum provident blanditiis quasi
            laudantium. Vel, libero. Obcaecati minus ut corporis ipsa! Impedit,
            laborum!
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default DAO
