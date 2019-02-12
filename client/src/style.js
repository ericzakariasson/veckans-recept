import { css } from 'styled-components'

const sizes = {
  desktop: 992,
  tablet: 768,
  mobile: 576,
}

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media screen and (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  acc[label].up = (...args) => css`
    @media screen and (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})

const customMedia = size => (...args) => css`
  @media (max-width: ${size / 16}em) {
    ${css(...args)}
  }
`

export const theme = {
  main: '#11B270',
  rgba: {
    main: opacity => `rgba(17, 178, 112, ${opacity / 100})`,
  },
  light: `rgba(17, 178, 112, ${10 / 100})`,
  black: '#222',
  transition: '0.2s ease-in-out',
  maxWidth: '65rem',
  gradient: `linear-gradient(180deg, #11B270 0%, #10A668 100%);`,
  fonts: {
    display: 'Playfair Display',
    body: 'Nunito',
  },
  media: {
    ...media,
    custom: customMedia,
  },
}
