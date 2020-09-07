import * as React from 'react'
import NextHead from 'next/head'
import GoogleFonts from 'next-google-fonts'

const Head = ({ title }) => (
  <React.Fragment>
    <GoogleFonts href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;900&display=swap" />
    <NextHead>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>{title}</title>

      <link
        rel="preload"
        href="assets/Lato-Black.ttf"
        as="font"
        type="font/ttf"
      />
      <link
        rel="preload"
        href="assets/Lato-Light.ttf"
        as="font"
        type="font/ttf"
      />
      <link
        rel="preload"
        href="assets/Lato-Regular.ttf"
        as="font"
        type="font/ttf"
      />
    </NextHead>
  </React.Fragment>
)
export default Head
