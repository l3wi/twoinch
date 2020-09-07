import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Icon from 'react-eva-icons'
import {
  provider,
  fetchQuote,
  fetchApproval,
  fetchBalance,
  maxAmount,
  approve,
} from '../../libs/web3'
import Select from 'react-select'
import { useWallet } from 'use-wallet'
import PieChart from './piechart'

import PricePerToken from './pricePerToken'
import Slippage from './slippage'
import Advanced from './advanced'
import ActionButton from './actionbutton'
import ComparisonTable from './comparison'

function SwapUI({ tokens }) {
  const { account, balance } = useWallet()

  const [tokenA, setTokenA] = useState(tokens.find((i) => i.label === 'ETH'))
  const [tokenB, setTokenB] = useState(tokens.find((i) => i.label === 'DAI'))
  const [amountA, setAmountA] = useState((1.0).toFixed(6))
  const [amountB, setAmountB] = useState(0)

  const [quote, setQuote] = useState({
    slippage: 0,
    distribution: [],
    distro: [],
  })
  const [approval, setApproval] = useState(0)
  const [tokenBalance, setTokenBalance] = useState(0)

  const requestQuote = async (amount) => {
    // If we have a wallet check tkn approval & balance
    if (account) {
      requestApproval()
      requestBalance()
    }
    if (!amountA || 0 >= amountA) return
    // Fetch the quote
    const response = await fetchQuote(tokenA, tokenB, amount || amountA)

    // Save response
    setQuote({
      slippage: response.slippage,
      distribution: response.distribution,
      distro: Object.assign(
        [],
        response.distribution
          .map((item, key) => {
            return {
              name: splitExchanges[key],
              percent: parseFloat(item.toString()) / 10,
            }
          })
          .filter((item) => item.percent > 0)
      ),
    })
    setAmountB(parseFloat(response.return).toFixed(6))
  }

  const requestApproval = async () => {
    if (tokenA.label === 'ETH') {
      setApproval(maxAmount)
      return
    }
    const approval = await fetchApproval(account, tokenA)
    setApproval(approval)
    return
  }

  const requestBalance = async () => {
    if (tokenA.label === 'ETH') {
      setTokenBalance((balance / 1e18).toFixed(4))
      return
    }
    const tokenBal = await fetchBalance(account, tokenA)
    setTokenBalance(parseFloat(tokenBal).toFixed(4))
    return
  }

  const action = async (item) => {
    switch (item) {
      case 'approve':
        const response = await approve(tokenA)
        break

      default:
        break
    }
  }

  const swapTokens = () => {
    const A = tokenA
    const B = tokenB
    const amount = amountB
    setTokenA(B)
    setTokenB(A)
    setAmountA(amount)
  }

  useEffect(() => {
    if (provider) requestQuote()
  }, [tokenA, tokenB, amountA])

  // Check approval when the account connects
  useEffect(() => {
    requestApproval(account)
  }, [account])
  // Check account balance
  useEffect(() => {
    console.log(balance)
    if (balance > 0) {
      requestBalance(account)
    }
  }, [balance])
  return (
    <Container>
      <SearchGroup>
        <SectionContainers>
          <InputContainers>
            {account ? (
              <MaxAmount onClick={() => setAmountA(tokenBalance)}>
                Max: {tokenBalance}
              </MaxAmount>
            ) : null}
            <Select
              defaultValue={tokenA}
              value={tokenA}
              onChange={(option) => setTokenA(option)}
              options={tokens}
              styles={customStyles}
            />
            <InputAmount
              value={amountA}
              onChange={(e) => setAmountA(e.target.value)}
            />
          </InputContainers>

          <SwapButton onClick={() => swapTokens()}>
            <SwapSvg />
          </SwapButton>
          <InputContainers>
            <Select
              defaultValue={tokenB}
              value={tokenB}
              onChange={(option) => setTokenB(option)}
              options={tokens}
              styles={customStyles}
            />
            <InputAmount value={amountB} />
          </InputContainers>
        </SectionContainers>
        <OutputContainers>
          <ActionButton
            account={account}
            tokenA={tokenA}
            amountA={amountA}
            approval={approval}
            tokenBalance={tokenBalance}
            action={action}
          />
          <InfoContainer>
            <PricePerToken
              tokenA={tokenA}
              tokenB={tokenB}
              amountA={amountA}
              amountB={amountB}
            />
            <Slippage slippage={quote.slippage} />
            <Advanced maxSlippage txSpeed />
          </InfoContainer>
        </OutputContainers>
      </SearchGroup>
      <ComparisonTable tokenA={tokenA} tokenB={tokenB} amountA={amountA} />
    </Container>
  )
}

const customStyles = {
  option: (provided, state) => ({
    ...provided,
  }),
  valueContainer: (provided) => ({
    padding: '6px 15px',
    fontSize: '1.5rem',
    fontFamily: 'Noto Sans JP',
    fontWeight: 500,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#4a4a4a',
  }),
  control: (provided) => ({
    ...provided,
    // none of react-select's styles are passed to <Control />
    borderRadius: 0,
    width: 150,
    border: '1px solid #4a4a4a',
    borderColor: '#4a4a4a',
    borderRight: 'none',
  }),
  indicatorContainer: (provided) => ({
    ...provided,
    color: '#4a4a4a',
  }),

  indicatorSeparator: (provided) => ({}),
  singleValue: (provided, state) => {
    return { ...provided }
  },
}

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
`

const MaxAmount = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.disabled};
  width: 150px;
  text-align: right;
  position: absolute;
  top: -19px;
  right: -1px;
  cursor: pointer;
`

const InputButton = styled.button`
  width: 150px;
  background: none;
  padding: 10px 15px;
  font-size: 1.5rem;
  font-family: 'Noto Sans JP';
  font-weight: 500;
  border: 1px solid #4a4a4a;
  border-right: none;
  border-radius: 0px;
  display: flex;
  justify-content: space-around;
  &:focus {
    outline: none;
  }
`

const InputAmount = styled.input`
  padding: 10px 20px;
  font-size: 1.5rem;
  font-family: 'Noto Sans JP';
  font-weight: 300;
  border: 1px solid #4a4a4a;
  border-radius: 0px;
  max-width: 150px;
  &:focus {
    outline: none;
  }
`
const SwapButton = styled.div`
  margin: 1.8rem 2rem;
  width: 30px;
  height: 30px;
`

const SectionContainers = styled.section`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin: 5px 30px;
`

const InputContainers = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`
const OutputContainers = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: auto;
  margin: 5px 30px;
  padding: 0px 0px;
  @media (max-width: 768px) {
    padding: 10px 15px;
    margin: 25px 0px;
    width: 100%;
  }
`

const SearchGroup = styled.section`
  width: 100%;
  padding: 10rem 0rem 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    height: auto;
    padding: 3rem 0rem;
  }
`
const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    height: auto;
    padding: 3rem 0rem;
  }
`

let splitExchanges = [
  'Uniswap',
  'Kyber',
  'Bancor',
  'Oasis',
  'Curve Compound',
  'Curve USDT',
  'Curve Y',
  'Curve Binance',
  'Curve Synthetix',
  'Uniswap Compound',
  'Uniswap CHAI',
  'Uniswap Aave',
  'Mooniswap',
  'Uniswap V2',
  'Uniswap V2 ETH',
  'Uniswap V2 DAI',
  'Uniswap V2 USDC',
  'Curve Pax',
  'Curve renBTC',
  'Curve tBTC',
  'Dforce XSwap',
  'Shell',
  'mStable mUSD',
  'Curve sBTC',
  'Balancer 1',
  'Balancer 2',
  'Balancer 3',
  'Kyber 1',
  'Kyber 2',
  'Kyber 3',
  'Kyber 4',
]

const SwapSvg = () => (
  <svg
    version="1.1"
    id="Capa_1"
    x="0px"
    y="0px"
    fill="#4A4A4A"
    viewBox="0 0 512.025 512.025"
  >
    <g>
      <path
        d="M155.293,4.653c-6.241-6.204-16.319-6.204-22.56,0l-112,112l22.56,22.72l84.64-84.8v457.44h32V54.573l84.64,84.64
				l22.72-22.56L155.293,4.653z"
      />
      <path
        d="M468.573,372.653l-84.64,84.8V0.013h-32v457.44l-84.64-84.64l-22.56,22.56l112,112c6.241,6.204,16.319,6.204,22.56,0
				l112-112L468.573,372.653z"
      />
    </g>
  </svg>
)

const SwapChevDown = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 13"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
    />
  </svg>
)

export default SwapUI
