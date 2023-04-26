import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import BuyCard from '../../components/BuyCard'
import networks from '../../networks.json'
import { APP_NETWORK } from '../../constants'
import { getCollectionSale } from '../../api/contracts'

function Weapon({ collectionLength }) {
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
        title='Strong Melee'
        description='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin.'
        price={price}
        image={'https://ether-luxe.definme.com/images/weapon1.png'}
        collectionContract={networks[APP_NETWORK].contracts.weaponCollection}
        kind={0x0000}
        collectionLength={collectionLength}
      />
      <BuyCard
        title='Strong Melee'
        description='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin.'
        price={price}
        image={'https://ether-luxe.definme.com/images/weapon2.png'}
        collectionContract={networks[APP_NETWORK].contracts.weaponCollection}
        collectionLength={collectionLength}
        kind={0x0000}
      />
      <BuyCard
        title='Strong Melee'
        description='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin.'
        price={price}
        image={'https://ether-luxe.definme.com/images/weapon3.png'}
        collectionContract={networks[APP_NETWORK].contracts.weaponCollection}
        kind={0x0000}
      />
      <BuyCard
        title='Strong Melee'
        description='Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin.'
        price={price}
        image={'https://ether-luxe.definme.com/images/weapon4.png'}
        collectionContract={networks[APP_NETWORK].contracts.weaponCollection}
        collectionLength={collectionLength}
        kind={0x0000}
      />
    </Box>
  )
}

export default Weapon
