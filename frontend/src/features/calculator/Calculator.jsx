import { useState } from "react"
import Benefits from "../benefits/BenefitsForm"
import TreatmentPlanForm from "../treatment-plan/TreatmentPlanForm"
import Estimator from "./Estimator"

const Calculator = ({ treatments, handleAddTreatment }) => {
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
    setCurrentStep('estimator')
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
        />
      )}

      {currentStep === 'estimator' && (
        <Estimator 
          lineItems={lineItems}
          benefits={benefits}
        />
      )}
    </div>
  )
}

export default Calculator