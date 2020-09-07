import App from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { useWallet, UseWalletProvider } from 'use-wallet'
import Page from '../components/page'

const theme = {
  colors: {
    primary: '#363C41',
    secondary: '#4A4A4A',
    disabled: '#9B9B9B',
    highlight: '#2F4960',
  },
}
const Global = createGlobalStyle`
 @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 900;
    font-display: block;
    src: url(assets/Lato-Black.ttf)
      format('truetype');
  }
   @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 500;
    font-display: block;
    src: url(assets/Lato-Regular.ttf)
      format('truetype');
  }
   @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-display: block;
    src: url(assets/Lato-Light.ttf)
      format('truetype');
  }
 
  body {
    font-family: 'Lato', sans-serif;
  }
  a {
    color: inherit; /* blue colors for links too */
    text-decoration: inherit; /* no underline */
  }
  
`

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <UseWalletProvider
          chainId={1}
          connectors={{
            walletconnect: { rpcUrl: 'https://bridge.walletconnect.org' },
          }}
        >
          <Page>
            <Component {...pageProps} />
          </Page>
          <Global />
        </UseWalletProvider>
      </ThemeProvider>
    )
  }
}
