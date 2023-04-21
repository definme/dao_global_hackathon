import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.5)',
        mt: 'auto',
        p: '40px',
      }}
    >
      <a href='https://definme.com/' target='_blank' rel='noreferrer'>
        <img
          src={require('../../images/definme.svg').default}
          alt='definmeLogo'
          style={{
            marginBottom: '10px',
          }}
        />
      </a>
      <Typography
        sx={{
          fontFamily: '"Inter", sans-serif',
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '18px',
          lineHeight: '22px',
          letterSpacing: '0.01em',
          color: 'white',
        }}
      >
        The project was developed with love by Definme.
      </Typography>
    </Box>
  )
}
