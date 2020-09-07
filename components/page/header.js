import styled from 'styled-components'
import { useRouter } from 'next/router'

import { useWallet } from 'use-wallet'
import useLocalStorage from '../../hooks/useLocalStorage'

const Header = () => {
  const { account, connect, connector, status, reset } = useWallet()
  const [provider, setProvider] = useLocalStorage('provider', false)

  const connectWallet = (key) => {
    connect(key)
    setProvider(key)
  }
  const disconnectWallet = (key) => {
    reset()
    setProvider(false)
  }
  return (
    <HeaderRow>
      <ActiveLink href="/">
        <Logo>2inch</Logo>
      </ActiveLink>
      <Links>
        <ActiveLink href="/swap">swap</ActiveLink>
        <ActiveLink href="/limit" disabled>
          limit
        </ActiveLink>
        <NavLink
          href="#"
          onClick={() =>
            !account ? connectWallet('injected') : disconnectWallet()
          }
        >
          <WalletInfo status={status} account={account} />
        </NavLink>
      </Links>
    </HeaderRow>
  )
}

const ActiveLink = ({ children, href, disabled }) => {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    if (disabled) return
    router.push(href)
  }

  return (
    <NavLink
      href={href}
      onClick={handleClick}
      active={router.pathname === href}
      disabled={disabled}
    >
      {children}
    </NavLink>
  )
}

const WalletInfo = ({ account, status }) => {
  switch (status) {
    case 'connecting':
      return <span>connecting</span>
      break
    case 'connected':
      if (account) {
        return (
          <span>{account.slice(0, 5) + '...' + account.slice(-5, -1)}</span>
        )
      } else {
        return <span>connecting</span>
      }
      break
    default:
      return <span>connect wallet</span>
      break
  }
}

const HeaderRow = styled.header`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`

const Logo = styled.h1`
  margin: 20px 40px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.highlight};
  user-select: none;
`
const Links = styled.nav`
  margin: 20px 35px;
  color: ${({ theme }) => theme.colors.primary};
  width: 250px;
  display: flex;
  justify-content: space-between;
  @media (min-width: 768px) {
    margin: 20px 40px;
    align-items: center;
  }
`
const NavLink = styled.a`
  color: ${({ theme, active }) =>
    active ? theme.colors.highlight : theme.colors.primary};
  font-weight: ${({ active }) => (active ? 700 : 300)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

export default Header
