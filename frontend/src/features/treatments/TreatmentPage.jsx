import { useState, useEffect, useReducer } from 'react';
import api from '../../api/axios'
import { treatmentReducer } from '../../hooks/treatmentReducer';
import AddTreatment from '../add-treatment/AddTreatment';
import TreatmentList from './TreatmentList';

const TreatmentPage = () => {
  const [treatments, dispatch] = useReducer(treatmentReducer, [])
  const [newTreatment, setNewTreatment] = useState(false)

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

  async function handleAddTreatment(treatment) {
    console.log('treatment:', treatment)

    try {
      console.log('Sending treatment data to backend')
      const res = await api.post('/treatments', treatment)
      const savedTreatment = res.data.saved_treatment
      console.log('saved treatment:', res.data.saved_treatment)
      dispatch({
        type: 'ADD_TREATMENT',
        savedTreatment
        // code: treatment.code,
        // description: treatment.description,
        // fee: treatment.fee,
        // covered: treatment.covered,
        // write_off: treatment.write_off,
        // category: treatment.category
      })
      setNewTreatment(false)
    } catch (error) {
      console.log('Error adding treatment:', error)
      alert('Failed to add treatment. Please try again.');
    }


  }


  return (
    <div className='flex flex-col'>
      <h1 className='font-xl font-semibold'>Treatment List</h1>

      <div className='flex flex-row w-full max-w-3xl items-start justify-between'>
        <TreatmentList 
          treatments={treatments}
        />

        {newTreatment ? (
          <AddTreatment
            onAddTreatment={handleAddTreatment}
            reset={() => setNewTreatment(false)}
          />
        ) : (
          <button 
            onClick={() => setNewTreatment(true)}
            className='h-12 bg-blue-500 rounded-full px-4 py-2 cursor-pointer'>
            Add Treatment Item
          </button>
        )}

      </div>
    </div>
  )
}

export default TreatmentPage