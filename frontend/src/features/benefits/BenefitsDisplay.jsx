

const BenefitsDisplay = ({ benefits }) => {
  return (
    <div className="max-w-[200px] w-full flex flex-col gap-0.5 text-xs">
      {benefits.moda && (
        <div>MODA/ODS/DELTA DENTAL</div>
      )}
      <div className="w-full flex justify-between items-center">
        <div>Max</div>
        <div>${benefits.max}</div>
      </div>

      <div className="w-full flex justify-between items-center">
        <div>Remaining</div>
        <div>${benefits.remaining}</div>
      </div>

      <div className="w-full flex justify-between items-center">
        <div>Deductible not met</div>
        <div>${benefits.deductible}</div>
      </div> 

      <div className="w-full flex justify-between items-center">
        <div>Anesthesia</div>
        <div>${benefits.anesthesia}</div>
      </div>

      <div className="w-full flex justify-between items-center">
        <div>Extractions</div>
        <div>${benefits.extractions}</div>
      </div>

      <div className="w-full flex justify-between items-center">
        <div>Implants</div>
        <div>${benefits.implants}</div>
      </div>

      
    </div>
  )
}

export default BenefitsDisplay