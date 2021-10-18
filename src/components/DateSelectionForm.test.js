import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import DateSelectionForm from './DateSelectionForm'

describe('<DateSelectionForm />', () => {
  test.each([
    [0, 'January - March'],
    [1, 'February - April'],
    [2, 'March - May'],
    [3, 'April - June'],
    [4, 'May - July'],
    [5, 'June - August'],
    [6, 'July - September'],
    [7, 'August - October'],
    [8, 'September - November'],
    [9, 'October - December'],
  ])('when firstMonth is %i, select renders with %s selected', (firstMonth, expectedResult) => {
    render(<DateSelectionForm onChange={jest.fn()} firstMonth={firstMonth} />)
    expect(screen.getByDisplayValue(expectedResult)).toBeInTheDocument()
  })

  it('triggers event handler on input change', () => {
    const mockOnChange = jest.fn()
    const initialInputValue = 0
    const newInputValue = 1
    render(<DateSelectionForm onChange={mockOnChange} firstMonth={initialInputValue} />)

    act(() => {
      fireEvent.change(screen.getByDisplayValue('January - March'), {
        target: { value: newInputValue },
      })
    })

    expect(mockOnChange).toBeCalledTimes(1)
  })
})
