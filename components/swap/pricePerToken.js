import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from 'react-eva-icons'

const pricePerToken = ({ tokenA, tokenB, amountA, amountB }) => {
  const [toggle, setToggle] = useState(true)

  return (
    <Outer onClick={() => setToggle(!toggle)}>
      <span>Exchange Rate:</span>

      <Inner>
        {toggle
          ? `${(amountA / amountB).toFixed(6)} ${tokenA.label} per ${
              tokenB.label
            }`
          : `${(amountB / amountA).toFixed(6)} ${tokenB.label} per ${
              tokenA.label
            }`}
      </Inner>
    </Outer>
  )
}

const Outer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 0px 0px 5px;
`
const Inner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

export default pricePerToken
