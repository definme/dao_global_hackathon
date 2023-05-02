import { useState, useContext } from 'react'
import ModalComponent from '../Modal'
import Input from '../Input'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import networks from '../../networks.json'
import { APP_NETWORK } from '../../constants'
import { shortenAddress } from '../../utils'
import { BuyProposalButton, TxLink } from './AddProposalWithActionModal.styled'

export default function AddProposalWithsActionModal({ isOpen, onClose, type }) {
  const {
    createProposalWithActionAddKind,
    createProposalWithActionSetInvariant,
  } = useContext(ConnectionContext)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')
  const [titleError, setTitleError] = useState('')
  const [txHash, setTxHash] = useState()
  const [success, setSuccess] = useState()

  // add kind

  const [kindNum, setKindNum] = useState('')
  const [kindName, setKindName] = useState('')

  function onKindNumChange(value) {
    setKindNum(value)
  }

  function onKindNameChange(value) {
    setKindName(value)
  }

  // add NFT
  //mint tokens
  // set invariant

  const [invariant, setInvariant] = useState()

  function onInvariantChange(value) {
    setInvariant(value)
  }

  async function onSubmit(e) {
    e.preventDefault()

    if (title === '') {
      setTitleError('Title not set')
    } else {
      if (type === 'kind') {
        await createProposalWithActionAddKind(
          title,
          summary,
          description,
          setTxHash,
          setSuccess,
          kindNum,
          kindName
        )
      } else if (type === 'invariant') {
        await createProposalWithActionSetInvariant(
          title,
          summary,
          description,
          setTxHash,
          setSuccess,
          invariant
        )
      }

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
          gutterBottom
          color='white'
          sx={{ fontWeight: 700, fontSize: '40px' }}
        >
          Create proposal
        </Typography>
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
          rows='2'
        />
        {type === 'kind' ? (
          <>
            <Input
              placeholder={'Kind number'}
              value={kindNum}
              onChange={onKindNumChange}
            />
            <Input
              placeholder={'Kind name'}
              value={kindName}
              onChange={onKindNameChange}
            />
          </>
        ) : type === 'invariant' ? (
          <Input
            placeholder={'Token invariant'}
            value={invariant}
            onChange={onInvariantChange}
          />
        ) : (
          ''
        )}
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
      </Box>
    </ModalComponent>
  )
}
