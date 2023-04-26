import { StyledButton } from './Button.styled'

export function Button({ children, disabled, onClick, padding }) {
  return (
    <StyledButton disabled={disabled} onClick={onClick} padding={padding}>
      {children}
    </StyledButton>
  )
}
