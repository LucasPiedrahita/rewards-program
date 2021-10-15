import React from 'react'
import { StyledDateSelectionForm } from '../styles/DateSelectionForm.styled'

const DateSelectionForm = ({ transactions, onChange, firstMonth }) => {
  const selectionOptions = [
    { label: 'January - March', firstMonth: 0 },
    { label: 'February - April', firstMonth: 1 },
    { label: 'March - May', firstMonth: 2 },
    { label: 'April - June', firstMonth: 3 },
    { label: 'May - July', firstMonth: 4 },
    { label: 'June - August', firstMonth: 5 },
    { label: 'July - September', firstMonth: 6 },
    { label: 'August - October', firstMonth: 7 },
    { label: 'September - November', firstMonth: 8 },
    { label: 'October - December', firstMonth: 9 },
  ]

  return (
    <StyledDateSelectionForm>
      <label htmlFor='dateSelection'>Select a three-month period:</label>
      <select value={firstMonth} id='dateSelection' name='dateSelection' onChange={onChange}>
        {selectionOptions.map(({ label, firstMonth }) => (
          <option key={firstMonth} value={firstMonth}>
            {label}
          </option>
        ))}
      </select>
    </StyledDateSelectionForm>
  )
}

export default DateSelectionForm
