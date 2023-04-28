import Box from '@mui/material/Box';
import BuyCard from '../../components/BuyCard';
import networks from '../../networks.json';
import { APP_NETWORK } from '../../constants';

function Characters({ collectionLength, saleTokens }) {
  const characters = saleTokens.filter(
    (token) => token.collection.name === 'Characters'
  );

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
      }}>
      {characters.map((character, key) => (
        <BuyCard
          key={key}
          title={character.name}
          image={character.image_uri}
          description={character.description}
          kind={character.kind}
          price={character.price}
          collectionLength={collectionLength}
          collectionContract={
            networks[APP_NETWORK].contracts.charactersCollection
          }
        />
      ))}
    </Box>
  );
}

export default Characters;
