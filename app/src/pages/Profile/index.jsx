import { useContext, useEffect, useState } from 'react'
import { utils } from 'ethers'
import Box from '@mui/material/Box'
import ProfileCard from '../../components/ProfileCard'
import { ConnectionContext } from '../../contexts/ConnectionContext'
import { getCollectionTokens } from '../../api'
import {
  ProfileTitle,
  ProfileContainer,
  ProfileBalances,
  ProfileBalanceItem,
  ProfileBalanceWrapper,
  ProfileBalanceAmount,
  ProfileBalanceAmountSpan,
  ProfileBalanceName,
  ProfileBalanceImageContainer,
  ProfileInfo,
  ProfileInfoTitle,
  ProfileInfoSubtitle,
  ProfileInfoButton,
} from './Profile.styled'

function Profile() {
  const { governanceUserBalance, userAddress, balance } =
    useContext(ConnectionContext)
  const [collection, setCollection] = useState([])

  function getNFTs() {
    getCollectionTokens(userAddress)
      .then(res => {
        setCollection(res)
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    if (userAddress) getNFTs()
  }, [userAddress])

  return (
    <ProfileContainer>
      <ProfileTitle>DAO Governance Token Balance</ProfileTitle>
      <ProfileBalances>
        <ProfileBalanceItem>
          <ProfileBalanceImageContainer>
            <img
              src={require('../../images/network.png')}
              alt='matic'
              width='40px'
              height='36px'
            />
          </ProfileBalanceImageContainer>
          <ProfileBalanceWrapper>
            <ProfileBalanceAmount>
              <ProfileBalanceAmountSpan>
                {Number(balance).toFixed(2)}
              </ProfileBalanceAmountSpan>{' '}
              MATIC
            </ProfileBalanceAmount>
            <ProfileBalanceName>Balance</ProfileBalanceName>
          </ProfileBalanceWrapper>
        </ProfileBalanceItem>
        <ProfileBalanceItem>
          <ProfileBalanceImageContainer elt>
            <img
              src={require('../../images/Logo.png')}
              alt='elt'
              width='30px'
              height='45px'
            />
          </ProfileBalanceImageContainer>
          <ProfileBalanceWrapper>
            <ProfileBalanceAmount>
              <ProfileBalanceAmountSpan>
                {Number(utils.formatEther(governanceUserBalance)).toFixed(2)}
              </ProfileBalanceAmountSpan>{' '}
              ELT
            </ProfileBalanceAmount>
            <ProfileBalanceName>Balance</ProfileBalanceName>
          </ProfileBalanceWrapper>
        </ProfileBalanceItem>
      </ProfileBalances>
      <ProfileTitle>My NFTs</ProfileTitle>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          mb: '60px',
        }}
      >
        {collection.length > 0 ? (
          collection.map((token, key) => <ProfileCard key={key} {...token} />)
        ) : (
          <ProfileInfo>
            <ProfileInfoTitle>You don't have an NFTs yet.</ProfileInfoTitle>
            <ProfileInfoSubtitle>
              You can go to the Marketplace section and purchase any NFT you
              like.
            </ProfileInfoSubtitle>
            <ProfileInfoButton to='/marketplace'>
              Go to marketplace
            </ProfileInfoButton>
          </ProfileInfo>
        )}
      </Box>
    </ProfileContainer>
  )
}

export default Profile
