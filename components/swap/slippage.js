import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from 'react-eva-icons'

const pricePerToken = ({ slippage }) => {
  const value = slippage > 0.01 ? slippage.toFixed(2) : '< 0.01'

  return (
    <Outer onClick={() => setToggle(!toggle)}>
      <span>Slippage:</span>

      <Inner slippage={slippage}>{`${value}%`}</Inner>
    </Outer>
  )
}

const Outer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0px 0px 5px;
`
const Inner = styled.div`
  color: ${({ slippage }) => {
    if (slippage > 10) {
      return '#e93614'
    } else if (slippage > 5) {
      return '#e98114'
    } else if (slippage > 1) {
      return '#bbb41e'
    } else {
      return '#41a438'
    }
  }};
`

export default pricePerToken
