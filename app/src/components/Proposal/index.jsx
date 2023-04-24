import { useState, useContext, useEffect } from 'react'
import { utils } from 'ethers'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import VoteModal from '../VoteModal'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import { APP_NETWORK } from '../../constants'
import networks from '../../networks.json'
import { shortenAddress } from '../../utils'

function Proposal({ proposal, success }) {
  const { userCanVote, userAddress, getProposal, executeProposal } =
    useContext(ConnectionContext)
  const [voteModalOpen, setVoteModalOpen] = useState(false)
  const [canVote, setCanVote] = useState(false)
  const [hasAction, setHasAction] = useState(false)
  const [txHash, setTxHash] = useState()
  const [txSuccess, setTxSuccess] = useState()

  const handleOpenModal = () => setVoteModalOpen(true)
  const handleCloseModal = () => setVoteModalOpen(false)

  useEffect(() => {
    if (userAddress) {
      userCanVote(proposal.id).then(res => setCanVote(res.canVote))
      if (success)
        getProposal(proposal.id).then(res => setHasAction(res.actions[0]))
    }
  }, [userAddress, proposal])

  return (
    <Container sx={{ mb: '40px' }}>
      <Box
        sx={{
          width: '90%',
          boxSizing: 'border-box',
          display: 'flex',
          gap: '20px',
          justifyContent: 'space-between',
          background: 'rgba(0, 0, 0, 0.3);',
          borderRadius: '20px',
          m: '20px auto',
          p: '40px',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant='h4'
            component='h1'
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              color: 'lightseagreen',
            }}
          >
            {proposal.metadata.title}
          </Typography>

          <Box>
            <Typography
              sx={{
                color: 'white',
              }}
            >
              Yes: {Number(utils.formatEther(proposal.result.yes))}{' '}
              {proposal.token.symbol}
            </Typography>
            <Typography
              sx={{
                color: 'white',
              }}
            >
              No: {Number(utils.formatEther(proposal.result.no))}{' '}
              {proposal.token.symbol}
            </Typography>
            <Typography
              sx={{
                color: 'white',
              }}
            >
              Abstain: {Number(utils.formatEther(proposal.result.abstain))}{' '}
              {proposal.token.symbol}
            </Typography>
            <Typography
              sx={{
                color: 'white',
                mt: '10px',
                borderTop: '1px solid rgba(0, 0, 0, 0.8)',
              }}
            >
              out of the total number of tokens:{' '}
              {Number(utils.formatEther(proposal.totalVotingWeight))}{' '}
              {proposal.token.symbol}
            </Typography>
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
                  {txSuccess ? txSuccess : txHash && shortenAddress(txHash)}
                </a>
              </Button>
            ) : success ? (
              <Button
                disabled={!hasAction}
                onClick={() =>
                  executeProposal(proposal.id, setTxHash, setTxSuccess)
                }
                variant='contained'
                sx={{
                  fontWeight: 'bold',
                  width: '100%',
                  minWidth: '150px',
                  background: 'lightseagreen',
                  mt: '20px',
                }}
              >
                Execute
              </Button>
            ) : (
              <Button
                disabled={!canVote}
                onClick={handleOpenModal}
                variant='contained'
                sx={{
                  fontWeight: 'bold',
                  width: '100%',
                  minWidth: '150px',
                  background: 'lightseagreen',
                  mt: '20px',
                }}
              >
                VOTE
              </Button>
            )}
            {}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '20px',
          }}
        >
          <Typography
            variant='p'
            component='p'
            gutterBottom
            sx={{
              color: 'white',
            }}
          >
            {proposal.metadata.summary}
          </Typography>
          <Typography
            sx={{
              color: 'white',
            }}
          >
            Proposal ID: {proposal.id}
          </Typography>
          <Typography
            sx={{
              color: 'white',
            }}
          >
            Creator: {proposal.creatorAddress}
          </Typography>
        </Box>
        <Typography
          sx={{
            color: 'lightseagreen',
            position: 'absolute',
            bottom: '20px',
            right: '20px',
          }}
        >
          {proposal.status}
        </Typography>
      </Box>
      <VoteModal
        isOpen={voteModalOpen}
        onClose={handleCloseModal}
        proposalId={proposal.id}
      />
    </Container>
  )
}

export default Proposal
