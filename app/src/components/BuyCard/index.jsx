import { useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { getCollectionSale } from '../../api/contracts'
import { shortenAddress } from '../../utils'
import { APP_NETWORK } from '../../constants'
import networks from '../../networks.json'
import { BuyButton, TxLink } from './BuyCard.styled'
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
  const { userAddress } = useContext(ConnectionContext)
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
          <BuyButton variant='contained' onClick={buyCollectionToken}>
            BUY for 0.0001 MATIC
          </BuyButton>
        )}
      </Box>
    </Box>
  )
}

export default BuyCard
