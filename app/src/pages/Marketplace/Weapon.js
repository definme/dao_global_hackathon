import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import BuyCard from '../../components/BuyCard'
import networks from '../../networks.json'
import { APP_NETWORK } from '../../constants'
import { getCollectionSale } from '../../api/contracts'

function Weapon() {
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
        title='Weapon'
        description='Some Description'
        price={price}
        image={require('../../images/weapon.png')}
        collectionContract={networks[APP_NETWORK].contracts.weaponCollection}
        kind={0x0000}
      />
      <BuyCard
        title='Weapon'
        description='Some Description'
        price={price}
        image={require('../../images/weapon.png')}
        collectionContract={networks[APP_NETWORK].contracts.weaponCollection}
        kind={0x0000}
      />
      <BuyCard
        title='Weapon'
        description='Some Description'
        price={price}
        image={require('../../images/weapon.png')}
        collectionContract={networks[APP_NETWORK].contracts.weaponCollection}
        kind={0x0000}
      />
    </Box>
  )
}

export default Weapon