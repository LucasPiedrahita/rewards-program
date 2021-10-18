import React from 'react'
import Table from 'react-bootstrap/Table'
import StyledDisplayCustomerRewardsTable from '../styles/DisplayCustomerRewardsTable.styled'

const DisplayCustomerRewardsTable = ({ customers, selectedMonths }) => (
  <StyledDisplayCustomerRewardsTable>
    <Table striped bordered hover id='customer-rewards-table'>
      <thead id='customer-rewards-header'>
        <tr>
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
              <td className='first-month'>{firstMonthRewards.toLocaleString()}</td>
              <td className='second-month'>{secondMonthRewards.toLocaleString()}</td>
              <td className='third-month'>{thirdMonthRewards.toLocaleString()}</td>
              <td className='total'>{totalRewards.toLocaleString()}</td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  </StyledDisplayCustomerRewardsTable>
)

export default DisplayCustomerRewardsTable