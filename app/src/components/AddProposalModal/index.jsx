import { useState, useContext } from 'react'
import ModalComponent from '../Modal'
import Input from '../Input'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { ConnectionContext } from '../../contexts/ConnectionContext'

export default function AddProposalModal({ isOpen, onClose }) {
  const { createProposal } = useContext(ConnectionContext)
  const [title, setTitle] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [titleError, setTitleError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()

    if (title === '') {
      setTitleError('Title not set')
    } else {
      await createProposal(title, shortDescription)
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
      </Box>
    </ModalComponent>
  )
}
