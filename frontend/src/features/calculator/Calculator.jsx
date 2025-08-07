import { useState } from "react"
import Benefits from "./BenefitsForm"
import TreatmentPlanForm from "./TreatmentPlanForm"

const Calculator = () => {
  const [benefits, setBenefits] = useState({
    max: '',
    remaining: '',
    deductible: '',
    anesthesia: '',
    extractions: '',
    implants: ''
  })

  const [showTreatmentPlan, setShowTreatmentPlan] = useState(false)

  const handleSaveBenefits = () => {
    setShowTreatmentPlan(true)
  }

  console.log('show treatment plan:', showTreatmentPlan)

  return (
    <div className="flex justify-between p-4">
      <Benefits 
        benefits={benefits}
        setBenefits={setBenefits}
        onSave={handleSaveBenefits}
      />

      {showTreatmentPlan && (
        <TreatmentPlanForm />
      )}
    </div>
  )
}

export default Calculator