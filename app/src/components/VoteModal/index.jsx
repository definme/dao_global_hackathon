import { useState, useContext } from 'react'
import ModalComponent from '../Modal'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import networks from '../../networks.json'
import { APP_NETWORK } from '../../constants'
import { shortenAddress } from '../../utils'

export default function VoteModal({ isOpen, onClose, proposalId }) {
  const { voteProposal } = useContext(ConnectionContext)
  const [vote, setVote] = useState('yes')
  const [txHash, setTxHash] = useState()
  const [success, setSuccess] = useState()

  const handleChange = event => {
    setVote(event.target.value)
  }

  async function onSubmit(e) {
    e.preventDefault()
    await voteProposal(proposalId, vote, setTxHash, setSuccess)
    onClose()
  }

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Typography
          textTransform='uppercase'
          gutterBottom
          color='white'
          sx={{ fontWeight: 700, fontSize: '20px', alignSelf: 'flex-start' }}
        >
          Voting:
        </Typography>
        <FormControl>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            name='radio-buttons-group'
            value={vote}
            onChange={handleChange}
          >
            <FormControlLabel
              value='yes'
              control={<Radio sx={{ color: '#1976d2' }} />}
              label='Yes'
              sx={{ color: 'white' }}
            />
            <FormControlLabel
              value='no'
              control={<Radio sx={{ color: '#1976d2' }} />}
              label='No'
              sx={{ color: 'white' }}
            />
            <FormControlLabel
              value='abstain'
              control={<Radio sx={{ color: '#1976d2' }} />}
              label='Abstain'
              sx={{ color: 'white' }}
            />
          </RadioGroup>
        </FormControl>
        {txHash ? (
          <Button
            variant='contained'
            sx={{
              fontWeight: 'bold',
              minWidth: '150px',
              background: 'lightseagreen',
              minHeight: '36px',
              mt: '20px',
            }}
          >
            <a
              href={`${networks[APP_NETWORK].params.blockExplorerUrls}tx/${txHash}`}
              target='_blank'
              rel='noreferrer'
            >
              {success ? success : txHash && shortenAddress(txHash)}
            </a>
          </Button>
        ) : (
          <Button
            variant='contained'
            onClick={onSubmit}
            sx={{
              fontWeight: 'bold',
              background: 'lightseagreen',
              minWidth: '150px',
              mt: '20px',
            }}
          >
            Submit
          </Button>
        )}
      </Box>
    </ModalComponent>
  )
}
