import { useEffect } from 'react'
import styled from 'styled-components'
import SwapUI from '../components/swap'
import { useWallet } from 'use-wallet'

import useSWR, { SWRConfig } from 'swr'
import fetch from 'isomorphic-fetch'
const fetcher = (url) => fetch(url).then((r) => r.json())

const Swap = ({ tokenList }) => {
  const { account, connector, status } = useWallet()

  let selectList = Object.assign(
    [],
    tokenList.tokens.map((item) => {
      return { value: item.address, label: item.symbol, d: item.decimals }
    })
  )
  selectList.push({
    value: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    label: 'ETH',
    d: 18,
  })

  return (
    <>
      <Note>TX functionality disabled, purely for testing</Note>
      <SwapUI tokens={alphaSort(selectList)} />
    </>
  )
}

const Note = styled.p`
  width: 100vw;
  text-align: center;
  opacity: 0.5;
  margin-bottom: -40px;
`

const alphaSort = (data) => {
  return data.sort((a, b) => {
    if (a.label < b.label) {
      return -1
    }
    if (a.label > b.label) {
      return 1
    }
    return 0
  })
}

export default Swap

export async function getServerSideProps() {
  const data = await fetcher('http://tokens.1inch.eth.link/')
  return { props: { tokenList: data } }
}
