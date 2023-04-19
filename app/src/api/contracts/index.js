import { ethers } from 'ethers'
import networks from '../../networks.json'
import CollectionSaleAbi from '../../abi/CollectionSale.json'
import { APP_NETWORK } from '../../constants'

export function getCollectionSale() {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const CollectionSale = new ethers.Contract(
    networks[APP_NETWORK].contracts.collectionSale,
    CollectionSaleAbi,
    signer
  )
  return CollectionSale
}
