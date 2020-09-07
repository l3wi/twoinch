import { ethers } from 'ethers'
import data from './data'
const atob = (a) => Buffer.from(a, 'base64').toString('binary')

const maxAmount =
  '115792089237316195423570985008687907853269984665639884998372537174953191969368'
let ETH_NODE =
  'aHR0cHM6Ly9tYWlubmV0LmluZnVyYS5pby92My9kZWVlZjBiNzM5Y2Y0Y2FjYjM5Y2VmNDE1ZDgwYjZjMw=='
let tokenList = []

let provider = new ethers.providers.JsonRpcProvider(atob(ETH_NODE))

const registerProvider = (wallet) => {
  if (wallet) {
    console.log('Using Wallet provider')
    provider = new ethers.providers.Web3Provider(wallet)
  } else if (window && window.ethereum) {
    console.log('Using Window provider')
    provider = new ethers.providers.Web3Provider(window.ethereum)
  }
}

const fetchQuote = async (tokenA, tokenB, amountA) => {
  // Setup Contract
  let contract = new ethers.Contract(
    data.ONE_SPLIT_ADDRESS,
    data.ONE_SPLIT_ABI,
    provider
  )

  const amount = ethers.utils.parseUnits(amountA, tokenA.d)
  const response = await contract.getExpectedReturn(
    tokenA.value,
    tokenB.value,
    amount,
    10,
    0
  )
  const estimatedGas = await contract.estimateGas.getExpectedReturn(
    tokenA.value,
    tokenB.value,
    amount,
    10,
    0
  )
  // Calculate Slippage
  const { ethToTokenA, ethToTokenB } = await fetchSlippage(tokenA, tokenB)
  const fullAmount = ethers.utils.formatUnits(
    response.returnAmount.toString(),
    tokenB.d
  )
  // Ratio of 1Eth's worth
  const oneEthToB = ethToTokenA / ethToTokenB
  // Ratio of Full amount's worth
  const AtoB = amountA / fullAmount
  const slippage = (AtoB / oneEthToB - 1) * 100
  return {
    ...response,
    return: ethers.utils.formatUnits(
      response.returnAmount.toString(),
      tokenB.d
    ),
    slippage,
    gas: estimatedGas.toString(),
  }
}

const fetchSlippage = async (tokenA, tokenB) => {
  let contract = new ethers.Contract(
    data.ONE_SPLIT_ADDRESS,
    data.ONE_SPLIT_ABI,
    provider
  )

  const ethToTokenA = await contract.getExpectedReturn(
    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    tokenA.value,
    '100000000000000000',
    10,
    0
  )

  const ethToTokenB = await contract.getExpectedReturn(
    tokenA.value,
    tokenB.value,
    ethToTokenA.returnAmount.toString(),
    10,
    0
  )

  return {
    ethToTokenA: ethers.utils.formatUnits(
      ethToTokenA.returnAmount.toString(),
      tokenA.d
    ),
    ethToTokenB: ethers.utils.formatUnits(
      ethToTokenB.returnAmount.toString(),
      tokenB.d
    ),
  }
}

const fetchBalance = async (account, tokenA) => {
  console.log(tokenA)
  let contract = new ethers.Contract(tokenA.value, data.ERC20_ABI, provider)
  const response = await contract.balanceOf(account)
  return ethers.utils.formatUnits(response.toString(), tokenA.d)
}

const fetchApproval = async (account, tokenA) => {
  let contract = new ethers.Contract(tokenA.value, data.ERC20_ABI, provider)

  const response = await contract.allowance(
    account,
    data.ONE_SPLIT_TOKEN_TAKER_ADDRESS
    // '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' // UNISWAP V2
  )

  return response.toString()
}

const approve = async (tokenA, amount) => {
  const signer = provider.getSigner()

  let contract = new ethers.Contract(tokenA.value, data.ERC20_ABI, signer)
  const response = await contract.approve(
    data.ONE_SPLIT_TOKEN_TAKER_ADDRESS,
    amount ? ethers.utils.parseUnits(amount, tokenA.d) : maxAmount
  )
  console.log(response)
  return response
}

module.exports = {
  registerProvider,
  fetchQuote,
  fetchBalance,
  fetchApproval,
  maxAmount,
  provider,
  approve,
}
