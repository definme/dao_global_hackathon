import { useState, useEffect } from 'react'
import { utils } from 'ethers'
import networks from '../networks.json'
import { APP_NETWORK } from '../constants'

const useConnection = () => {
  const [userAddress, setUserAddress] = useState('')
  const [chainId, setChainId] = useState('')
  const [balance, setBalance] = useState(0)

  function getChain() {
    window.ethereum
      .request({ method: 'eth_chainId' })
      .then(chain => setChainId(parseInt(chain, 16).toString()))
      .catch(e => console.log(e))
  }

  function getBalance() {
    window.ethereum
      .request({ method: 'eth_getBalance', params: [userAddress, 'latest'] })
      .then(res => setBalance(Number(utils.formatEther(res))))
      .catch(e => console.log(e))
  }

  async function getUserAddress() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      })

      if (accounts.length > 0) {
        const account = accounts[0]
        setUserAddress(utils.getAddress(account))
      }
    }
  }

  async function connectWallet() {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })

    setUserAddress(utils.getAddress(accounts[0]))
  }

  async function switchNetwork() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networks[APP_NETWORK].params.chainId }],
      })
      return true
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [networks[APP_NETWORK].params],
          })
          return true
        } catch (error) {
          console.error(error)
          return false
        }
      } else {
        console.error(error)
        return false
      }
    }
  }

  function onAddressChanged() {
    getUserAddress()
  }

  function onChainChanged() {
    getChain()
  }

  useEffect(() => {
    getUserAddress()
  }, [])

  useEffect(() => {
    if (userAddress) {
      getChain()
      getBalance()
    }
  }, [userAddress])

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', onAddressChanged)
      window.ethereum.on('chainChanged', onChainChanged)
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', onAddressChanged)
        window.ethereum.removeListener('chainChanged', onChainChanged)
      }
    }
  }, [])

  return {
    userAddress,
    chainId,
    getChain,
    getUserAddress,
    connectWallet,
    switchNetwork,
    balance,
  }
}

export default useConnection
