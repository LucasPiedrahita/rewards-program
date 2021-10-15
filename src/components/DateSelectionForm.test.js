import React from 'react'
import { render, screen } from '@testing-library/react'
import DateSelectionForm from './DateSelectionForm'

describe('test DateSelectionForm', () => {
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
  ])('when firstMonth is %i, %s is selected', (firstMonth, expectedResult) => {
    render(<DateSelectionForm onChange={jest.fn()} firstMonth={firstMonth} />)
    expect(screen.getByDisplayValue(expectedResult)).toBeInTheDocument()
  })
})
