import React from 'react'
import BenefitsDisplay from '../benefits/BenefitsDisplay'

const Estimator = ({ benefits, lineItems }) => {
  return (
    <div className='w-full '>
      <BenefitsDisplay 
        benefits={benefits}
      />
    </div>
  )
}

export default Estimator