import React from 'react'
import useConnection from '../hooks/useConnection'
import useDAO from '../hooks/useDAO'

export const ConnectionContext = React.createContext()

const ConnectionProvider = ({ children }) => {
  const {
    chainId,
    getChain,
    userAddress,
    getUserAddress,
    connectWallet,
    switchNetwork,
    balance,
    governanceUserBalance,
    governanceContractBalance,
  } = useConnection()

  const {
    dao,
    proposals,
    createProposal,
    voteProposal,
    userCanVote,
    pendingProposals,
  } = useDAO(userAddress)

  return (
    <ConnectionContext.Provider
      value={{
        userAddress,
        chainId,
        getChain,
        getUserAddress,
        connectWallet,
        switchNetwork,
        balance,
        dao,
        proposals,
        createProposal,
        voteProposal,
        governanceUserBalance,
        governanceContractBalance,
        userCanVote,
        pendingProposals,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}

export default ConnectionProvider
