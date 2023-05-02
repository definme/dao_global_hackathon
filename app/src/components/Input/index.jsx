import {
  StyledInput,
  InputContainer,
  InputError,
  TextArea,
} from './Input.styled'
function Input({ error, value, onChange, placeholder, multiline, rows }) {
  return (
    <InputContainer>
      {multiline ? (
        <TextArea rows={rows || '8'} placeholder={placeholder}></TextArea>
      ) : (
        <StyledInput
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}
      <InputError>{error}</InputError>
    </InputContainer>
  )
}

export default Input
