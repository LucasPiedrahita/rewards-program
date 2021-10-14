import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box
  }

  h1, footer {
    padding: 2rem 0;
    color: ${({ theme }) => theme.colors.white};
  }
`
export default GlobalStyles
