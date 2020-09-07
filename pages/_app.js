import App from 'next/app'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#0070f3',
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
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
