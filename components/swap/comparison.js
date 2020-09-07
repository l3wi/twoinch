import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Icon from 'react-eva-icons'
import DataTable from 'react-data-table-component'
import fetch from 'isomorphic-fetch'
import { ethers } from 'ethers'

const columns = [
  {
    name: 'Exchange',
    selector: 'exchange',
  },
  {
    name: 'Return Amount',
    selector: 'amount',
    sortable: true,
  },
  {
    name: 'Gas Fee',
    selector: 'gas_used',
    sortable: true,
  },
]

const debankDexes = [
  'dydx',
  'oneinch',
  'uniswap2',
  'kyber',
  'mooniswap',
  'zrx',
  'balancer',
  'uniswap',
  'loopring',
  'ddex',
  'paraswap',
  'curve',
  'oasis',
  'dodo',
  'tokenlon',
  'dexag',
  'idex',
]

const fetchPrice = async (
  dex_id,
  pay_token_id,
  pay_token_amount,
  receive_token_id
) => {
  const url = `https://api.debank.com/swap/check?dex_id=${dex_id}&pay_token_id=${pay_token_id}&pay_token_amount=${pay_token_amount}&receive_token_id=${receive_token_id}`
  const response = await fetch(url).then((r) => r.json())

  if (response.error_code != '0') {
    return { exchange: dex_id, error: response.error_msg.en }
  } else {
    return {
      exchange: dex_id,
      gas_used: response.data.gas_used,
      loss_ratio: response.data.loss_ratio,
      amount: response.data.receive_token_amount,
    }
  }
}

const compareApi = async (tokenA, tokenB, amountA) => {
  console.log(tokenA)
  const pay_token_id = tokenA.label === 'ETH' ? 'eth' : tokenA.value
  const receive_token_id = tokenB.label === 'ETH' ? 'eth' : tokenB.value
  const amount = ethers.utils.parseUnits(amountA, tokenA.d)

  return await Promise.all(
    debankDexes.map((dex) =>
      fetchPrice(dex, pay_token_id, amount, receive_token_id)
    )
  )
}

const ComparisonTable = ({ tokenA, tokenB, amountA }) => {
  const [rates, setRates] = useState([])
  const [noRates, setNoRates] = useState([])

  const [loading, setLoading] = useState(true)

  const getRates = async () => {
    const data = await compareApi(tokenA, tokenB, amountA)
    setRates(
      data
        .filter((item) => !item.error)
        .map((item) => {
          return {
            exchange: item.exchange,
            amount: parseFloat(
              ethers.utils.formatUnits(item.amount, tokenB.d).toString()
            ).toFixed(6),
            gas_used: item.gas_used,
          }
        })
    )
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    getRates()
  }, [tokenA, tokenB, amountA])

  return (
    <Outer>
      <DataTable
        columns={columns}
        data={rates}
        defaultSortField="amount"
        defaultSortAsc={false}
        dense={true}
      />
    </Outer>
  )
}

const Outer = styled.div`
  width: 100%;
  max-width: 690px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 0px 0px 5px;
`

export default ComparisonTable
