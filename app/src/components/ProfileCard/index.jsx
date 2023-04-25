import React from 'react'
import {
  CardContainer,
  CardImage,
  CardInfo,
  CardTitle,
  CardText,
} from './ProfileCard.styled'

function ProfileCard({ image_uri, name, level, contract_token_id }) {
  return (
    <CardContainer>
      <CardImage src={image_uri} width='282px' height='auto' alt='nft' />
      <CardInfo>
        <CardTitle>{name}</CardTitle>
        <CardText gutterBottom color='white'>
          Level: {level}
        </CardText>
        <CardText gutterBottom color='white'>
          ID: {contract_token_id}
        </CardText>
        <CardText>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin.
        </CardText>
      </CardInfo>
    </CardContainer>
  )
}

export default ProfileCard
