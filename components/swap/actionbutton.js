import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from 'react-eva-icons'

const Button = ({
  account,
  tokenA,
  amountA,
  tokenBalance,
  approval,
  action,
}) => {
  if (!account) {
    return <ActionButton disabled>{'connect wallet'}</ActionButton>
  } else if (0 >= approval) {
    return (
      <ActionButton
        onClick={() => action('approve')}
      >{`approve ${tokenA.label}`}</ActionButton>
    )
  } else if (amountA > tokenBalance) {
    return (
      <ActionButton smol disabled>
        {'insufficient funds'}
      </ActionButton>
    )
  } else {
    return (
      <ActionButton approval={approval} onClick={() => requestQuote()}>
        {'swap'}
      </ActionButton>
    )
  }
}

const ActionButton = styled.button`
  height: 60px;
  color: white;
  background: ${({ theme, approval }) =>
    approval === 0 ? theme.colors.secondary : theme.colors.highlight};
  padding: 10px 25px 14px;
  margin: 0px 0px 20px;
  font-size: ${({ smol }) => (smol ? '1.2rem' : '1.5rem')};
  font-family: 'Noto Sans JP';
  font-weight: 500;
  border: 1px solid #4a4a4a;
  border-radius: 0px;
  width: 250px;
  &:focus {
    outline: none;
  }
`

export default Button
