import { useState, useContext } from 'react'
import ModalComponent from '../Modal'
import Input from '../Input'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import networks from '../../networks.json'
import { APP_NETWORK } from '../../constants'
import { shortenAddress } from '../../utils'
import {
  BuyProposalButton,
  TxLink,
  CheckboxContainer,
  Title,
  ModalContainer,
  Description,
} from './AddProposalWithActionModal.styled'

export default function AddProposalWithsActionModal({ isOpen, onClose, type }) {
  const {
    createProposalWithActionAddKind,
    createProposalWithActionSetInvariant,
    createProposalWithActionMintGovernanceTokens,
    createProposalWithActionAddNFT,
  } = useContext(ConnectionContext)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [description, setDescription] = useState('')
  const [titleError, setTitleError] = useState('')
  const [txHash, setTxHash] = useState()
  const [success, setSuccess] = useState()

  function getModalDescription(type) {
    switch (type) {
      case 'kind':
        return 'to add new kind to existing NFT'
      case 'invariant':
        return 'to change ELT distribution invariant'
      case 'mint':
        return 'to mint ELT tokens'
      case 'nft':
        return 'to add new NFT collection'
      default:
        break
    }
  }

  // add kind

  const [kindNum, setKindNum] = useState('')
  const [kindName, setKindName] = useState('')
  const [contractToAddKind, setContractToAddKind] = useState('')

  function onKindNumChange(value) {
    setKindNum(value)
  }

  function onKindNameChange(value) {
    setKindName(value)
  }

  function onContractNameChange(value) {
    setContractToAddKind(value)
  }

  // add NFT
  const [nftAddress, setNFTAddress] = useState('')
  const [nftPrice, setNFTPrice] = useState()
  const [nftIsGovernance, setNFTIsGovernance] = useState(false)

  function onNFTAddressChange(value) {
    setNFTAddress(value)
  }

  function onNFTPriceChange(value) {
    setNFTPrice(value)
  }

  function onNFTIsGovernanceChange(event) {
    setNFTIsGovernance(event.target.checked)
  }

  //mint tokens
  const [mintValue, setMintValue] = useState()

  function onMintValueChange(value) {
    setMintValue(value)
  }

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
          kindName,
          contractToAddKind
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
      } else if (type === 'mint') {
        await createProposalWithActionMintGovernanceTokens(
          title,
          summary,
          description,
          setTxHash,
          setSuccess,
          mintValue
        )
      } else if (type === 'nft') {
        await createProposalWithActionAddNFT(
          title,
          summary,
          description,
          setTxHash,
          setSuccess,
          nftAddress,
          nftPrice,
          nftIsGovernance
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
      <ModalContainer>
        <Title>Create proposal</Title>
        <Description>{getModalDescription(type)}</Description>
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
            <Input
              placeholder={'Collection contract'}
              value={contractToAddKind}
              onChange={onContractNameChange}
            />
          </>
        ) : type === 'invariant' ? (
          <Input
            placeholder={'Token invariant'}
            value={invariant}
            onChange={onInvariantChange}
          />
        ) : type === 'mint' ? (
          <Input
            placeholder={'Mint value(wei)'}
            value={mintValue}
            onChange={onMintValueChange}
          />
        ) : type === 'nft' ? (
          <>
            <Input
              placeholder={'Nft collection address'}
              value={nftAddress}
              onChange={onNFTAddressChange}
            />
            <Input
              placeholder={'Nft price(wei)'}
              value={nftPrice}
              onChange={onNFTPriceChange}
            />
            <CheckboxContainer>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: 'rgb(143, 122, 235)',
                      fontFamily: 'Open Sans',
                      '&.Mui-checked': {
                        color: 'rgb(143, 122, 235)',
                      },
                    }}
                    checked={nftIsGovernance}
                    onChange={onNFTIsGovernanceChange}
                  />
                }
                label='Is Governance'
              />
            </CheckboxContainer>
          </>
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
      </ModalContainer>
    </ModalComponent>
  )
}
