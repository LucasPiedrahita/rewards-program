import React from 'react'
// TODO: convert to table layout
const DisplayCustomers = ({ customers, selectedMonths }) => {
  console.log(selectedMonths)
  return (
    <>
      <h2>Customers</h2>
      <table id='customer-rewards-table'>
        <thead>
          <tr id='customer-rewards-header'>
            <th className='customer'>Customer</th>
            <th className='first-month'>{selectedMonths[0]}</th>
            <th className='second-month'>{selectedMonths[1]}</th>
            <th className='third-month'>{selectedMonths[2]}</th>
            <th className='total'>Total</th>
          </tr>
        </thead>
        <tbody id='customer-rewards-body'>
          {customers.map(
            ({
              customerId,
              firstMonthRewards,
              secondMonthRewards,
              thirdMonthRewards,
              totalRewards,
            }) => (
              <tr key={customerId}>
                <td className='customer'>{customerId.replace(/\./, ' ')}</td>
                <td className='first-month'>{firstMonthRewards}</td>
                <td className='second-month'>{secondMonthRewards}</td>
                <td className='third-month'>{thirdMonthRewards}</td>
                <td className='total'>{totalRewards}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  )
}

export default DisplayCustomers
