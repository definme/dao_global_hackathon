import React from 'react'
import {
  CardContainer,
  CardImage,
  CardInfo,
  CardTitle,
  CardText,
  CardBlock,
  CardTextSpan,
} from './ProfileCard.styled'

function ProfileCard({
  image_uri,
  name,
  level,
  contract_token_id,
  description,
}) {
  return (
    <CardContainer>
      <CardImage src={image_uri} width='282px' height='auto' alt='nft' />
      <CardInfo>
        <CardTitle>{name}</CardTitle>
        <CardBlock>
          <CardText>
            ID: <CardTextSpan>#{contract_token_id}</CardTextSpan>
          </CardText>
          <CardText>
            Level: <CardTextSpan>{level}</CardTextSpan>
          </CardText>
        </CardBlock>
        <CardText>{description}</CardText>
      </CardInfo>
    </CardContainer>
  )
}

export default ProfileCard
