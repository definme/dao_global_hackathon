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
        description='Possesses all the necessary skills for combat and squad control. Excellent firing at short and medium distances.'
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
        description='Able to repair any equipment on the battlefield. As well as a high level of use of heavy weapons.'
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
        description='Able to destroy enemy vehicles at close range. And also can fight from a long distance - an excellent sniper.'
        price={price}
        image={'https://ether-luxe.definme.com/images/character3.png'}
        collectionContract={
          networks[APP_NETWORK].contracts.charactersCollection
        }
        kind={0x0002}
      />
      <BuyCard
        title='Dungeon Doctor'
        description='Able to heal any member of the squad on the battlefield or quickly carry the wounded to cover. Possesses good skills in combat at medium distances.'
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
