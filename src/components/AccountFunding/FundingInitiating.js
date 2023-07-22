import React from 'react'

const FundingInitiating = (props) => {
  return (
    <div className='FundingInitiating'>
      <main>
      <h1 className='exchange'>
        {props.exchange}
      </h1>
        <p className='initiating'>
          Initiating transaction...
        </p>
      </main>
      
    </div>
  )
}

export default FundingInitiating