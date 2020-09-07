import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from 'react-eva-icons'

const Advanced = ({}) => {
  const [toggle, setToggle] = useState(false)
  const [slippage, setSlippage] = useState(0.1)
  const [speed, setSpeed] = useState('fast')

  return (
    <>
      <Title>
        {`Advanced: `}
        <div style={{ marginLeft: 5 }} onClick={() => setToggle(!toggle)}>
          <TextIndicator bool={toggle} state={true}>
            on
          </TextIndicator>
          /
          <TextIndicator bool={toggle} state={false}>
            off
          </TextIndicator>
        </div>
      </Title>
      {toggle ? (
        <>
          <hr />
          <Outer j={'space-between'}>
            <span>Max Slippage:</span>
            <TextIndicator
              onClick={() => setSlippage(0.1)}
              bool={slippage}
              state={0.1}
            >{`0.1%`}</TextIndicator>
            <TextIndicator
              onClick={() => setSlippage(0.5)}
              bool={slippage}
              state={0.5}
            >{`0.5%`}</TextIndicator>
            <TextIndicator
              onClick={() => setSlippage(1)}
              bool={slippage}
              state={1}
            >{`1%`}</TextIndicator>
            <TextIndicator
              onClick={() => setSlippage(3)}
              bool={slippage}
              state={3}
            >{`3%`}</TextIndicator>
            <TextIndicator bool={slippage}>{`custom`}</TextIndicator>
          </Outer>
          <Outer j={'space-between'}>
            <span>Tx Speed:</span>
            <TextIndicator
              onClick={() => setSpeed('instant')}
              bool={speed}
              state={'instant'}
            >{`Instant`}</TextIndicator>
            <TextIndicator
              onClick={() => setSpeed('fast')}
              bool={speed}
              state={'fast'}
            >{`Fast`}</TextIndicator>
            <TextIndicator
              onClick={() => setSpeed('moderate')}
              bool={speed}
              state={'moderate'}
            >{`Moderate`}</TextIndicator>
            <TextIndicator
              onClick={() => setSpeed('custom')}
              bool={speed}
              state={'custom'}
            >{`Custom`}</TextIndicator>
          </Outer>
        </>
      ) : null}
    </>
  )
}

const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  margin: 0px 0px 5px;
`

const TextIndicator = styled.span`
  cursor: pointer;
  font-weight: ${({ bool, state }) => (bool === state ? 900 : 500)};
`

const Outer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  color: #4a4a4a;
  justify-content: ${({ j }) => (j ? j : 'space-between')};
  margin: 0px 0px 5px;
`

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

export default Advanced
