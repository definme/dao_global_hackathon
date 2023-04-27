import { useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ethers } from 'ethers'
import { getCollectionSale } from '../../api/contracts'
import { shortenAddress } from '../../utils'
import { APP_NETWORK } from '../../constants'
import networks from '../../networks.json'
import { TxLink, BuyButton } from './BuyCard.styled'
import { getCollectionTokens } from '../../api'
import { ConnectionContext } from '../../contexts/ConnectionContext'

function BuyCard({
  title,
  description,
  price,
  image,
  collectionContract,
  kind,
  collectionLength,
}) {
  const { userAddress, getAllBalances } = useContext(ConnectionContext)
  const [txHash, setTxHash] = useState()
  const [success, setSuccess] = useState()

  async function buyCollectionToken() {
    const CollectionSale = getCollectionSale()

    await CollectionSale.requestNFTPurchase(collectionContract, kind, {
      value: price,
    })
      .then(tx => {
        setTxHash(tx.hash)
        tx.wait()
          .then(res => {
            setTimeout(function testTokens() {
              getCollectionTokens(userAddress)
                .then(res => {
                  if (res.length > collectionLength) {
                    setSuccess('SUCCESS!!')
                    getAllBalances()
                  } else {
                    setTimeout(testTokens, 2000)
                  }
                })
                .catch(e => {
                  console.log(e)
                })
            }, 1000)
          })
          .catch(e => setSuccess('FAILED'))
      })
      .catch(e => {
        setSuccess('FAILED')
        console.log(e)
      })
  }

  return (
    <Box
      sx={{
        width: '290px',
        p: '2px',
        borderRadius: '8px',
        background: '#22222E',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <img
        src={image}
        width='100%'
        style={{ objectFit: 'contain' }}
        alt='nft'
      />
      <Box
        sx={{
          p: '15px 15px',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <Typography textTransform='uppercase' gutterBottom color='white'>
          {title}
        </Typography>
        <Typography gutterBottom color='white' my={4}>
          {description}
        </Typography>
        {txHash ? (
          <BuyButton variant='contained'>
            <TxLink
              href={`${networks[APP_NETWORK].params.blockExplorerUrls}tx/${txHash}`}
              target='_blank'
              rel='noreferrer'
            >
              {success ? success : txHash && shortenAddress(txHash)}
            </TxLink>
          </BuyButton>
        ) : (
          <BuyButton onClick={buyCollectionToken} disabled={!userAddress}>
            BUY for {price ? ethers.utils.formatEther(price) : '0'} MATIC
          </BuyButton>
        )}
      </Box>
    </Box>
  )
}

export default BuyCard
