import { useState, useRef, useEffect } from "react"

const TreatmentDropdown = ({ treatmentsByCategory, onSelect, width = 'w-32' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const treatmentDropdownRef = useRef(null) 

  console.log(treatmentsByCategory)
  
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (treatmentDropdownRef.current && !treatmentDropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      isOpen &&
      treatmentDropdownRef.current &&
      !treatmentDropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false)
    }
  }

  document.addEventListener("click", handleClickOutside)
  return () => {
    document.removeEventListener("click", handleClickOutside)
  }
}, [isOpen])

  const toggleDropdown = (e) => {
    e.stopPropagation()
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (e, treatment) => {
    e.stopPropagation();
    console.log('Selected:', treatment);
    onSelect(treatment)
    // setSelectedOption(option)
    setIsOpen(false);
  };  

  console.log(isOpen)

  return (
    <div className="relative overflow-visible" ref={treatmentDropdownRef}>
      <button
        type='button'
        onClick={toggleDropdown} 
        className={`px-4 py-1 ${width} bg-blue-500 text-white rounded-lg cursor-pointer`}>
        'Select option'
      </button>

      {isOpen && (
        <div className="absolute top-1 left-0 mt-1 bg-zinc-50 border border-blue-900 rounded shadow-md z-10">
          {treatmentsByCategory.map((t) => (
            <div 
              key={t.code} 
              onMouseDown={(e) => handleOptionClick(e, t)} 
              className="px-4 py-1 hover:bg-blue-200 cursor-pointer"
            >
              {t.description}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TreatmentDropdown