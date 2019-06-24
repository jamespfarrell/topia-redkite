import React from 'react'
import styled from 'styled-components'

export const GrayLink = styled.a`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.57;
  color: #7e808c;
  text-decoration: none;
`

export const Card = styled.form`
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 rgba(33, 44, 48, 0.15);
  background-color: #ffffff;
  padding: 20px 40px;
  margin-bottom: 24px;

  .header {
    display: flex;
    justify-content: space-between;

    a {
      text-decoration: none;
      color: #959ba6;
      font-weight: bold;
    }
  }

  h1 {
    padding: 0px;
    margin: 0px;
    font-family: Inter;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.4;
    color: #383a44;
  }

  p {
    font-size: 14px;
    line-height: 1.57;
    color: #959ba6;
  }

  b {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.57;
    color: #212c30;
  }

  .row {
    display: flex;
    margin-top: 16px;
    flex-wrap: wrap;

    .col {
    }
  }
`

const PreviewDiv = styled.div`
  width: 80px;
  height: 80px;
  background-size: cover;
  margin-bottom: 24px;
`

export const FormContainer = styled.div`
  width: 408px;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`

export const SaveBtnContainer = styled.div`
  width: 90px;
  margin-left: 24px;
`

export const Preview = ({url}) =>
  <PreviewDiv style={{backgroundImage: `url(${url})`}}></PreviewDiv>


