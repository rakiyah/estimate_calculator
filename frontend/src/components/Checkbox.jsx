import React from 'react'

const Checkbox = ({ checked, val, onChange }) => {
  return (
    <label className="flex items-center justify-between cursor-pointer select-none">
      <span className="uppercase">{val}</span>
      <div 
        className={`w-5 h-5 flex items-center justify-center border-2 rounded 
                    ${checked ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-400'}`}
        onClick={() => onChange(val, !checked)}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      
    </label>
  );
}

export default Checkbox