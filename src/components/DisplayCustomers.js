import React from 'react'

const DisplayCustomers = ({ customers }) => (
  <>
    <h2>Customers</h2>
    {customers.map((customer) => (
      <p key={customer}>
        {customer.replace(/\./, ' ')}{' '}
        <button type='button' onClick={(event) => console.log('customer button click')}>
          Click
        </button>
      </p>
    ))}
  </>
)

export default DisplayCustomers
