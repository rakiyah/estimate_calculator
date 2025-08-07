import { useState, useRef, useEffect } from "react"

const Dropdown = ({ options, name, onChange, initialOption, width = 'w-36' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(initialOption || null)
  const dropdownRef = useRef(null)

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      isOpen &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
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

  const handleOptionClick = (e, option) => {
    e.stopPropagation();
    console.log('Selected:', option);
    onChange(name, option.id)
    setSelectedOption(option)
    setIsOpen(false);
  };  

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type='button'
        onClick={toggleDropdown} 
        className={`px-4 py-1 ${width} bg-blue-500 text-white rounded-lg cursor-pointer`}>
        {selectedOption?.label || 'Select option'}
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-40 bg-zinc-50 border border-blue-900 rounded shadow-md z-10 overflow-hidden">
          {options.map((opt) => (
            <div 
              key={opt.id} 
              onMouseDown={(e) => handleOptionClick(e, opt)} 
              className="px-4 py-1 hover:bg-blue-200 cursor-pointer"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown