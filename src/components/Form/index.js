import React from 'react'
import styled from 'styled-components'

export const ErrMsg = styled.p`
  font-size: 14px;
  line-height: 1.57;
  color: #ff5500;
  text-align: center;
`

const Label = styled.label`
  display: block;
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.57;
  color: ${props => props.hasError ? "#ff5500" : "#212c30"};

  input {
    margin-top: 8px;
    display: block;
    width: 100%;
    height: 48px;
    border-radius: 3px;
    border: solid 1px ${props => props.hasError ? "#ff5500" : "#b8bcc3"};
    background-color: #ffffff;
    font-size: 16px;
    -webkit-appearance: none;
    outline: none;
    text-indent: 18px;
    margin-bottom: 16px;
    box-sizing: border-box;
    line-height: 1.5;

    &:focus {
      border: solid 2px #333333;
    }
  }
`

const Button = styled.input`
  border-radius: 3px;
  border: 1px solid #13c266;
  background-color: #13c266;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  color: #ffffff;
  width: 100%;
  margin-top: 16px;
  margin-bottom: 32px;

  &:hover {
    opacity: 0.8;
  }
`

export const Line = styled.div`
  height: 1px;
  opacity: 0.2;
  background-color: #7e808c;
  margin-bottom: 16px;
`

export const Text = styled.p`
  font-family: Inter;
  font-size: 14px;
  line-height: 1.57;
  color: #7e808c;

  a {
    color: #13c266;
    text-decoration: none;
  }
`

export const SubHeader = styled.p`
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  color: #7e808c;
`

export const InputWithLabel = ({label, type, name, handleUpdate, error}) =>
  <Label hasError={error}>
    {label}
    <input type={type} name={name} onChange={handleUpdate} />
    {error && <p>{error}</p>}
  </Label>

export const SubmitButton = ({label, disabled}) =>
  <Button type="submit" value={label} disabled={disabled} />
