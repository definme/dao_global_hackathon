import Box from '@mui/material/Box'
import { FooterText, FooterLink } from './Footer.styled'

export default function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: ' #22222E;',
        mt: 'auto',
        p: '30px',
      }}
    >
      <FooterText>
        ©{new Date().getFullYear()} EtherLuxe. Was developed with love by{' '}
        <FooterLink
          href='https://definme.com/'
          target='_blank'
          rel='noreferrer'
        >
          Definme
        </FooterLink>
      </FooterText>
    </Box>
  )
}
