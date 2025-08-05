import { useState, useEffect } from 'react'
import Navbar from './layout/Navbar'
import './App.css'
import api from './api/axios'
import TreatmentList from './features/treatments/TreatmentList'
import Calculator from './features/calculator/Calculator'

function App() {
  const [view, setView] = useState('treatments')


  const handleViewChange = (val) => {
    setView(val)
  }

  return (
    <div className=''>
      <Navbar handleViewChange={handleViewChange} />

      <div className='flex flex-col gap-4 max-w-4xl mx-auto bg-green-400'>
        {view === 'treatments' && (
          <TreatmentList />
        )}

        {view === 'calculator' && (
          <Calculator />
        )}
      </div>

    </div>
  )
}

export default App
