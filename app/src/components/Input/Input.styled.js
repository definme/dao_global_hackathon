import styled from 'styled-components'

export const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid white;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  padding: 13px 0;
  background: transparent;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  color: white;
`

export const InputContainer = styled.div`
  margin-bottom: 18px;
  width: 100%;
  max-width: 600px;
`

export const InputError = styled.span`
  color: red;
  font-size: 12px;
  text-transform: lowercase;
  min-height: 14px;
  display: block;
  margin: 5px 0;
`

export const InputLabel = styled.label`
  color: white;
`
