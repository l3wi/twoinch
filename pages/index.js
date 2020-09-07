import styled from 'styled-components'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push('/swap')
  }
  return (
    <>
      <Container>
        <Headline>
          bullruns are too short for <b>shitty</b> dApps
        </Headline>
        <Byline>
          <b>2inch</b> leverages 1inch's contracts but without the shitty webapp
        </Byline>
        <ActionButton href={'/swap'} onClick={handleClick}>
          swap now
        </ActionButton>
      </Container>
      <ParaContainer>
        <Byline>Okay, but what is this?</Byline>
        <Para>
          <p>
            1inch's matching contracts are great{' '}
            <ParaLink
              href={'https://github.com/CryptoManiacsZone/1inchProtocol'}
              target="_blank"
            >
              pieces of engineering
            </ParaLink>
            . they match trades across a number of DEXs, all on-chain, and finds
            paths where necessary. for low liquidity trades on odd parings you
            can't really beat it.
          </p>
          <p>
            while the core tech is good, the user interface is severely lacking.
            You would hope that they would be able to build a decent frontend
            given the amount they earn from{' '}
            <ParaLink
              href={'https://twitter.com/ka_toos/status/1298680429629734912'}
              target="_blank"
            >
              arbitraging on their users
            </ParaLink>
            . irrespective users should be able to utilise their contracts
            without the webapp freezing, hard reloading and jittering on them.
          </p>
          <p>
            <b>2inch</b> was made to fix up some of the obvious issues with
            1inch. we still use 1inch's contracts so you can execute 1inch
            trades, but we've listened to the community and implemented features
            to help make the experience a little better. Easy to find exchange
            rates, stable switching between currencies, easy to navigate
            advanced features, and simple comparisons to other DEXs including
            fees.
          </p>
          <p>
            so enjoy! and hopefully this site will inspire them to pay more
            attention to their users, or they could play to their strong suits
            and{' '}
            <ParaLink
              href={
                'https://twitter.com/haydenzadams/status/1297369548740530176'
              }
              target="_blank"
            >
              just copy this interface.
            </ParaLink>{' '}
            i don't mind.
          </p>
          <br />
          <p>
            built by{' '}
            <ParaLink href={'https://blackwattle.ad'} target="_blank">
              black wattle
            </ParaLink>
          </p>
        </Para>
      </ParaContainer>
    </>
  )
}

const ActionButton = styled.a`
  color: white;
  background: ${({ theme }) => theme.colors.secondary};
  padding: 10px 0px 14px;
  font-size: 1.5rem;
  font-family: 'Noto Sans JP';
  font-weight: 500;
  border: 1px solid #4a4a4a;
  border-radius: 0px;
  width: 250px;
  text-align: center;
  margin-top: 4rem;
  &:focus {
    outline: none;
  }
`

const Container = styled.section`
  width: 100%;
  height: 80vh;
  box-sizing: border-box;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: auto;
    padding: 1rem 1rem;
  }
`
const Headline = styled.h2`
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 0px;
`
const Byline = styled.h3`
  font-size: 1.2rem;
  font-weight: 300;
  @media (max-width: 768px) {
    padding: 1rem 1rem;
  }
`
const ParaContainer = styled.section`
  width: 100%;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: auto;
    padding: 1rem 1rem;
  }
`

const ParaLink = styled.a`
  color: palevioletred;
`
const Para = styled.div`
  max-width: 620px;
`

export default Home
