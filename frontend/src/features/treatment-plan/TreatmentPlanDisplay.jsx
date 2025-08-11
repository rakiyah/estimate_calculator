import React from 'react'

const TreatmentPlanDisplay = ({ lineItems, getTotal }) => {
  console.log('lineItems:', lineItems)
  return (
    <div className='max-w-xs w-full flex flex-col'>    

      {lineItems.map((item, index) => (
        <div className='flex gap-2'>
          <div>{index+1}</div>
          <div>{item.code}</div>
          <div className='w-56 truncate'>{item.description}</div>
          <div>{item.fee}</div>
        </div>
      ))}

      <div className='self-end font-semibold'>${getTotal()}</div>
    </div>
  )
}

export default TreatmentPlanDisplay