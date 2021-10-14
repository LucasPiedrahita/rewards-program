import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  h1, footer {
    padding: 2rem 0;
    color: ${({ theme }) => theme.colors.white};
  }
`
export default GlobalStyles
