import { useState, useContext } from 'react';
import ModalComponent from '../Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ConnectionContext } from '../../contexts/ConnectionContext';
import networks from '../../networks.json';
import { APP_NETWORK } from '../../constants';
import { shortenAddress } from '../../utils';
import { BuyProposalButton } from '../AddProposalModal/AddProposalModal.styled';
import { Container, Vote } from './VoteModal.styled';

export default function VoteModal({ isOpen, onClose, proposalId }) {
  const { voteProposal } = useContext(ConnectionContext);
  const [vote, setVote] = useState('');
  const [txHash, setTxHash] = useState();
  const [success, setSuccess] = useState();

  const handleChange = (event) => {
    setVote(event.target.value);
  };

  async function onSubmit(e) {
    e.preventDefault();
    await voteProposal(proposalId, vote, setTxHash, setSuccess);
    onClose();
  }

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}>
        <Typography
          gutterBottom
          color='white'
          alignItems='center'
          sx={{ fontWeight: 700, fontSize: '40px' }}>
          Voting
        </Typography>
        <Container>
          <Vote
            type='button'
            value={'yes'}
            onClick={handleChange}
            active={vote === 'yes'}></Vote>
          <Vote
            type='button'
            value={'no'}
            onClick={handleChange}
            active={vote === 'no'}></Vote>
          <Vote
            type='button'
            value={'abstian'}
            onClick={handleChange}
            active={vote === 'abstian'}></Vote>
        </Container>
        {txHash ? (
          <Button
            variant='contained'
            sx={{
              fontWeight: 'bold',
              minWidth: '150px',
              background: 'lightseagreen',
              minHeight: '36px',
              mt: '20px',
            }}>
            <a
              href={`${networks[APP_NETWORK].params.blockExplorerUrls}tx/${txHash}`}
              target='_blank'
              rel='noreferrer'>
              {success ? success : txHash && shortenAddress(txHash)}
            </a>
          </Button>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              mt: '20px',
            }}>
            <BuyProposalButton
              variant='contained'
              onClick={onSubmit}
              sx={{
                fontWeight: 'bold',
                background: 'lightseagreen',
                minWidth: '150px',
                mt: '20px',
              }}>
              Submit
            </BuyProposalButton>
          </Box>
        )}
      </Box>
    </ModalComponent>
  );
}
