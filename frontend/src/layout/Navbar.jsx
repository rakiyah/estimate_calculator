

const Navbar = ({ handleViewChange }) => {
  return (
    <div className='w-screen h-16 flex justify-center bg-blue-300'>
      <div className='w-4/5 flex items-center justify-around'>
        <button
          onClick={() => handleViewChange('treatments')}
          className="cursor-pointer">
          Treatments
        </button>

        <button
          onClick={() => handleViewChange('calculator')}
          className="cursor-pointer">
          Estimate
        </button>
      </div>
    </div>
  )
}

export default Navbar