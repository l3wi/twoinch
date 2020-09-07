import React, { useEffect, useMemo } from 'react'

import styled from 'styled-components'
import Header from './header'
import Head from './head'

import { registerProvider } from '../../libs/web3'
import { useWallet } from 'use-wallet'
import useLocalStorage from '../../hooks/useLocalStorage'

const Page = (props) => {
  const [provider, setProvider] = useLocalStorage('provider', false)
  const { account, connect, status, ethereum } = useWallet()

  useMemo(() => {
    if (provider) {
      console.log('Provider Found:', provider)
      connect(provider)
      registerProvider()
    }
  }, [])

  useEffect(() => {
    if (status === 'connected') {
      console.log('Connected!')
      registerProvider(ethereum)
    }
  }, [status])

  return (
    <Main>
      <Head title="2inch - 1inch but not shit" />
      <Header />
      {props.children}
    </Main>
  )
}

const Main = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`
export default Page
