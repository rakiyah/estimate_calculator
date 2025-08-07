import { useState, useEffect } from "react"

const BenefitsForm = ({ benefits, setBenefits, onSave }) => {
  const [remainingIsMax, setRemainingIsMax] = useState(false)

  useEffect(() => {
    if (remainingIsMax) {
      setBenefits((prev) => ({ ...prev, remaining: prev.max }));
    } else {
      setBenefits((prev) => ({ ...prev, remaining: '' }));
    }
  }, [remainingIsMax, benefits.max])

  const handleChange = (e) => {
    const { name, value } = e.target
    setBenefits((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave()
  }

  return (
    <div className="max-w-xs w-full text-sm">

      <h1 className="w-fit text-lg font-semibold mb-4">Insurance Benefits</h1>

      <form onSubmit={handleSubmit} className=" w-full flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <label>Max</label>

          
          <div className="flex flex-col items-center gap-1">
            <div className="relative">
              <input 
                type='number'
                name='max'
                value={benefits.max}
                onChange={handleChange}
                className="px-2 py-0.5 w-24 pl-4 rounded-lg border border-blue-900 no-spinner"
              />
              <span className="absolute left-1 top-1/2 -translate-y-1/2">$</span>
            </div>


          </div>

        </div> 

        <div className="flex flex-row items-center justify-between">
          <label>Remaining</label>

            <div className="flex items-center gap-1 ml-auto">
              <input 
                type='checkbox'
                checked={remainingIsMax}
                value={remainingIsMax}
                onChange={() => setRemainingIsMax(!remainingIsMax)}
              />

              <span>remaining = max</span>
            </div>
          <div className="relative ml-2">
            <input 
              type='number'
              name='remaining'
              value={benefits.remaining}
              onChange={handleChange}
              className="px-2 py-0.5 w-24 pl-4 rounded-lg border border-blue-900 no-spinner"
            />
            <span className="absolute left-1 top-1/2 -translate-y-1/2">$</span>
          </div>
        </div> 

        <div className="flex flex-row items-center justify-between">
          <label>Deductible (if not met)</label>
          <div className="relative">
            <input 
              type='number'
              name='deductible'
              value={benefits.deductible}
              onChange={handleChange}
              className="px-2 py-0.5 w-20 pl-4 rounded-lg border border-blue-900 no-spinner"
            />
            <span className="absolute left-1 top-1/2 -translate-y-1/2">$</span>
          </div>
        </div> 

        <div className="flex flex-row items-center justify-between">
          <label>Anesthesia</label>
          <div className="relative">
            <input 
              type='number'
              name='anesthesia'
              value={benefits.anesthesia}
              onChange={handleChange}
              className="px-2 py-0.5 w-20 pr-4 rounded-lg border border-blue-900 no-spinner"
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2">%</span>
          </div>
        </div> 

        <div className="flex flex-row items-center justify-between">
          <label>Extractions</label>
          <div className="relative">
            <input 
              type='number'
              name='extractions'
              value={benefits.extractions}
              onChange={handleChange}
              className="px-2 py-0.5 w-20 pr-4 rounded-lg border border-blue-900 no-spinner"
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2">%</span>
          </div>
        </div>  

        <div className="flex flex-row items-center justify-between">
          <label>Implants</label>
          <div className="relative">
            <input 
              type='number'
              name='implants'
              value={benefits.implants}
              onChange={handleChange}
              className="px-2 py-0.5 w-20 pr-4 rounded-lg border border-blue-900 no-spinner"
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2">%</span>
          </div>
        </div>   
        <button 
          type='submit'
          className="mt-2 ml-auto px-4 py-1 rounded-full bg-emerald-400 cursor-pointer">
          Save Benefits
        </button>                   
      </form>
    </div>
  )
}

export default BenefitsForm