import {
  StyledInput,
  InputContainer,
  InputError,
  InputLabel,
} from './Input.styled'
function Input({ label, error, value, onChange }) {
  return (
    <InputContainer>
      <InputLabel>{label}:</InputLabel>
      <StyledInput value={value} onChange={e => onChange(e.target.value)} />
      <InputError>{error}</InputError>
    </InputContainer>
  )
}

export default Input
