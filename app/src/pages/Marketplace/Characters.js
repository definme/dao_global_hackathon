import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import BuyCard from '../../components/BuyCard'
import networks from '../../networks.json'
import { APP_NETWORK } from '../../constants'
import { getCollectionSale } from '../../api/contracts'

function Characters({ collectionLength }) {
  const [price, setPrice] = useState()

  async function getPrice() {
    const CollectionSale = getCollectionSale()

    await CollectionSale.getPrice(
      networks[APP_NETWORK].contracts.charactersCollection
    )
      .then(res => {
        setPrice(res)
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    getPrice()
  }, [])

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
      }}
    >
      <BuyCard
        title='Squad Leader'
        description='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin.'
        image={'https://ether-luxe.definme.com/images/character1.png'}
        collectionContract={
          networks[APP_NETWORK].contracts.charactersCollection
        }
        kind={0x0000}
        price={price}
        collectionLength={collectionLength}
      />
      <BuyCard
        title='Repulsed Repairman'
        description='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin.'
        price={price}
        image={'https://ether-luxe.definme.com/images/character2.png'}
        collectionContract={
          networks[APP_NETWORK].contracts.charactersCollection
        }
        collectionLength={collectionLength}
        kind={0x0001}
      />
      <BuyCard
        title='Scout Saboteur'
        description='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin.'
        price={price}
        image={'https://ether-luxe.definme.com/images/character3.png'}
        collectionContract={
          networks[APP_NETWORK].contracts.charactersCollection
        }
        kind={0x0002}
      />
      <BuyCard
        title='Dungeon Doctor'
        description='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin.'
        price={price}
        image={'https://ether-luxe.definme.com/images/character4.png'}
        collectionContract={
          networks[APP_NETWORK].contracts.charactersCollection
        }
        collectionLength={collectionLength}
        kind={0x0003}
      />
    </Box>
  )
}

export default Characters
