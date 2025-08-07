import { useState } from "react"
import Benefits from "./BenefitsForm"
import TreatmentPlanForm from "./TreatmentPlanForm"

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

  const [showTreatmentPlan, setShowTreatmentPlan] = useState(false)

  const handleSaveBenefits = () => {
    setShowTreatmentPlan(true)
  }

  return (
    <div className="flex p-4 gap-10">
      <Benefits 
        benefits={benefits}
        setBenefits={setBenefits}
        onSave={handleSaveBenefits}
      />

      {showTreatmentPlan && (
        <TreatmentPlanForm 
          treatments={treatments}
        />
      )}
    </div>
  )
}

export default Calculator