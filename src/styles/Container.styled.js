import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 0 3rem;
  margin: 0 auto;
  background-color: ${({ bg }) => bg};
`
export default Container
