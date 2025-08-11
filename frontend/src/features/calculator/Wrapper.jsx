import { useState } from "react"
import Benefits from "../benefits/BenefitsForm"
import TreatmentPlanForm from "../treatment-plan/TreatmentPlanForm"
import Estimator from "./Estimator"

const Wrapper = ({ treatments, handleAddTreatment }) => {
  const [benefits, setBenefits] = useState({
    moda: '',
    max: '',
    remaining: '',
    deductible: '',
    anesthesia: '',
    extractions: '',
    implants: ''
  })
  const [lineItems, setLineItems] = useState([])
  const [showTreatmentPlan, setShowTreatmentPlan] = useState(false)
  const [currentStep, setCurrentStep] = useState('benefits')

  const handleSaveBenefits = () => {
    setShowTreatmentPlan(true)
    setCurrentStep('treatment')
  }

  const handleSetTreatmentPlan = () => {
    console.log('Set line items:', lineItems)
    setCurrentStep('estimator')
  }

  const getTotal = () => {
    let total = 0
    lineItems.map((item) => {
      total += Number(item.fee)
    })
    return total
  }

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <h1>Patient Name</h1>

      {currentStep === 'benefits' && (
        <Benefits 
          benefits={benefits}
          setBenefits={setBenefits}
          onSave={handleSaveBenefits}
        />
      )}

      {currentStep === 'treatment' && (
        <TreatmentPlanForm
          treatments={treatments}
          lineItems={lineItems}
          setLineItems={setLineItems}
          onSet={handleSetTreatmentPlan}
          getTotal={getTotal}
        />
      )}

      {currentStep === 'estimator' && (
        <Estimator 
          lineItems={lineItems}
          benefits={benefits}
          getTotal={getTotal}
        />
      )}
    </div>
  )
}

export default Wrapper