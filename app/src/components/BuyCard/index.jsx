import { useState } from 'react'
import { ethers } from 'ethers'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { getCollectionSale } from '../../api/contracts'
import { shortenAddress } from '../../utils'
import { APP_NETWORK } from '../../constants'
import networks from '../../networks.json'

function BuyCard({
  title,
  description,
  price,
  image,
  collectionContract,
  kind,
}) {
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
          .then(res => setSuccess('SUCCESS!!'))
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
        borderRadius: '20px',
        width: '268px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: ' 0 0 12px 1px #000000',
        p: '15px',
        background: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <img
        src={image}
        width='100%'
        height='300px'
        style={{ objectFit: 'contain' }}
        alt='nft'
      />
      <Box
        sx={{
          p: '15px 0',
        }}
      >
        <Typography
          align='center'
          textTransform='uppercase'
          gutterBottom
          color='white'
        >
          {title}
        </Typography>
        <Typography gutterBottom color='white'>
          {description}
        </Typography>
        <Typography gutterBottom color='white'>
          Price: {price ? ethers.utils.formatEther(price) : '0'} MATIC
        </Typography>
        {txHash ? (
          <Button
            variant='contained'
            sx={{
              fontWeight: 'bold',
              width: '100%',
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
            sx={{
              fontWeight: 'bold',
              width: '100%',
              background: 'lightseagreen',
            }}
            onClick={buyCollectionToken}
          >
            BUY
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default BuyCard
