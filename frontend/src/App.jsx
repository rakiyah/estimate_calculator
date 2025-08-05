import { useState, useEffect } from 'react'
import Navbar from './layout/Navbar'
import './App.css'
import api from './api/axios'
import TreatmentPage from './features/treatments/TreatmentPage'
import Calculator from './features/calculator/Calculator'

function App() {
  const [view, setView] = useState('treatments')


  const handleViewChange = (val) => {
    setView(val)
  }

  console.log('view', view)

  return (
    <div className=''>
      <Navbar handleViewChange={handleViewChange} />

      <div className='flex flex-col gap-4 max-w-4xl mx-auto'>
        {view === 'treatments' && (
          <TreatmentPage />
        )}

        {view === 'calculator' && (
          <Calculator />
        )}
      </div>

    </div>
  )
}

export default App
