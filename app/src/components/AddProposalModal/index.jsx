import { useState, useContext } from 'react'
import ModalComponent from '../Modal'
import Input from '../Input'
import Box from '@mui/material/Box'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import networks from '../../networks.json'
import { APP_NETWORK } from '../../constants'
import { shortenAddress } from '../../utils'
import {
  BuyProposalButton,
  TxLink,
  Title,
  ModalContainer,
} from './AddProposalModal.styled'

export default function AddProposalModal({ isOpen, onClose }) {
  const { createProposal } = useContext(ConnectionContext)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')
  const [titleError, setTitleError] = useState('')
  const [txHash, setTxHash] = useState()
  const [success, setSuccess] = useState()

  async function onSubmit(e) {
    e.preventDefault()

    if (title === '') {
      setTitleError('Title not set')
    } else {
      await createProposal(title, summary, description, setTxHash, setSuccess)
      onClose()
    }
  }

  function onShortDescriptionChange(value) {
    setSummary(value)
  }

  function onTitleChange(value) {
    setTitle(value)
    setTitleError('')
  }

  function onDescriptionChange(value) {
    setDescription(value)
  }

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <ModalContainer>
        <Title>Create proposal</Title>
        <Input
          placeholder={'Title'}
          error={titleError}
          value={title}
          onChange={onTitleChange}
        />
        <Input
          placeholder={'Summary'}
          value={summary}
          onChange={onShortDescriptionChange}
        />
        <Input
          placeholder={'Description'}
          value={description}
          multiline
          onChange={onDescriptionChange}
        />
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
        >
          {txHash ? (
            <BuyProposalButton>
              <TxLink
                href={`${networks[APP_NETWORK].params.blockExplorerUrls}tx/${txHash}`}
                target='_blank'
                rel='noreferrer'
              >
                {success ? success : txHash && shortenAddress(txHash)}
              </TxLink>
            </BuyProposalButton>
          ) : (
            <BuyProposalButton
              variant='contained'
              onClick={onSubmit}
              sx={{
                fontWeight: 'bold',
                minWidth: '150px',
              }}
            >
              Create
            </BuyProposalButton>
          )}
        </Box>
      </ModalContainer>
    </ModalComponent>
  )
}
