import { useState, useContext } from 'react'
import ModalComponent from '../Modal'
import Input from '../Input'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import networks from '../../networks.json'
import { APP_NETWORK } from '../../constants'
import { shortenAddress } from '../../utils'

export default function AddProposalModal({ isOpen, onClose }) {
  const { createProposal } = useContext(ConnectionContext)
  const [title, setTitle] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [titleError, setTitleError] = useState('')
  const [txHash, setTxHash] = useState()
  const [success, setSuccess] = useState()

  async function onSubmit(e) {
    e.preventDefault()

    if (title === '') {
      setTitleError('Title not set')
    } else {
      await createProposal(title, shortDescription, setTxHash, setSuccess)
      onClose()
    }
  }

  function onShortDescriptionChange(value) {
    setShortDescription(value)
  }

  function onTitleChange(value) {
    setTitle(value)
    setTitleError('')
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
          align='center'
          textTransform='uppercase'
          gutterBottom
          color='white'
          sx={{ fontWeight: 700, fontSize: '20px' }}
        >
          Create proposal
        </Typography>
        <Input
          label={'Title'}
          error={titleError}
          value={title}
          onChange={onTitleChange}
        />
        <Input
          label={'Short Description'}
          value={shortDescription}
          onChange={onShortDescriptionChange}
        />
        {txHash ? (
          <Button
            variant='contained'
            sx={{
              fontWeight: 'bold',
              minWidth: '150px',
              background: 'lightseagreen',
              minHeight: '36px',
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
            }}
          >
            Create
          </Button>
        )}
      </Box>
    </ModalComponent>
  )
}
