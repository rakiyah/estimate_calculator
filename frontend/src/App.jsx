import { useState, useEffect, useReducer } from 'react'
import api from './api/axios'
import { treatmentReducer } from './hooks/treatmentReducer';
import Navbar from './layout/Navbar'
import './App.css'
import TreatmentPage from './features/treatments/TreatmentPage'
import Calculator from './features/calculator/Calculator'

function App() {
  const [view, setView] = useState('calculator')
  const [treatments, dispatch] = useReducer(treatmentReducer, [])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    api.get('/treatments')
      .then((res) => {
        dispatch({
          type: 'SET_TREATMENTS',
          payload: res.data
        })
      })
      .catch((err) => {
        console.error('Error fetching treatments:', err);
      });
  }, []);

  const handleViewChange = (val) => {
    setView(val)
  }

  async function handleAddTreatment(treatment) {
    try {
      console.log('Sending treatment data to backend')
      const res = await api.post('/treatments', treatment)
      const savedTreatment = res.data.saved_treatment
      console.log('saved treatment:', res.data.saved_treatment)
      dispatch({
        type: 'ADD_TREATMENT',
        savedTreatment
      })
      setShowForm(false)
    } catch (error) {
      console.log('Error adding treatment:', error)
      alert('Failed to add treatment. Please try again.');
    }
  }

  console.log('view', view)
  console.log('Treatments:', treatments)

  return (
    <div className=''>
      <Navbar handleViewChange={handleViewChange} />

      <div className='flex flex-col gap-4 max-w-4xl mx-auto'>
        {view === 'treatments' && (
          <TreatmentPage 
            treatments={treatments}
            handleAddTreatment={handleAddTreatment}
            dispatch={dispatch}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        )}

        {view === 'calculator' && (
          <Calculator 
            treatments={treatments}
            handleAddTreatment={handleAddTreatment}
          />
        )}
      </div>

    </div>
  )
}

export default App
