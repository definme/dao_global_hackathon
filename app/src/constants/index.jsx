import { ethers } from 'ethers'
import networks from '../networks.json'

export const APP_NETWORK = Object.keys(networks)[0]
export const IPFS_API_KEY = process.env.REACT_APP_IPFS_API_KEY

export const API_HOST = 'https://api-ether-luxe.definme.com/api'

export const MIN_GOVERNANCE_TOKEN_TO_PROPOSAL = ethers.utils.parseEther('5')
