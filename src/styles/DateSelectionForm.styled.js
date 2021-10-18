import styled from 'styled-components'

const StyledDateSelectionForm = styled.form`
  margin: 2rem 0;
  font-size: 1.1rem;

  select {
    margin: 0 1rem;
  }

  label {
    border-bottom: 2px solid ${({ theme }) => theme.colors.action};
  }
`
export default StyledDateSelectionForm
