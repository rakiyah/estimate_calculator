import React from 'react'
import BenefitsDisplay from '../benefits/BenefitsDisplay'
import TreatmentPlanDisplay from '../treatment-plan/TreatmentPlanDisplay'
import Calculator from './Calculator'

const Estimator = ({ benefits, lineItems, getTotal }) => {

  return (
    <div className='w-full flex flex-col'>
      <div className='w-full flex justify-between'>
        <BenefitsDisplay 
          benefits={benefits}
        />

        <TreatmentPlanDisplay 
          lineItems={lineItems}
          getTotal={getTotal}
        />
      </div>

      <Calculator 
        lineItems={lineItems}
        benefits={benefits}
        getTotal={getTotal}
      />
    </div>
  )
}

export default Estimator