import { useState, useEffect, useReducer } from 'react';
import api from '../../api/axios'
import { treatmentReducer } from '../../hooks/treatmentReducer';
import TreatmentList from './TreatmentList';
import TreatmentForm from './TreatmentForm';
import Modal from '../../components/Modal';

const TreatmentPage = () => {
  const [treatments, dispatch] = useReducer(treatmentReducer, [])
  const [showForm, setShowForm] = useState(false)
  const [treatmentToEdit, setTreatmentToEdit] = useState({})
  const [treatmentToDelete, setTreatmentToDelete] = useState(null)

  const isEditMode = Boolean(treatmentToEdit?.code)

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

  // Show TreatmentForm for editing
  function handleEditTreatment(treatment) {
    setTreatmentToEdit(treatment)
    setShowForm(true)
  }

  // Submit edit treatment
  const handleUpdateTreatment = async (treatment) => {
    try {
      const res = await api.put(`/treatments/${treatment.code}`,
        treatment
      )
      const updatedTreatment = res.data.updated_treatment
      dispatch({
        type: 'UPDATE_TREATMENT',
        updatedTreatment
      })
    } catch (error) {

    }
    setTreatmentToEdit({})
    setShowForm(false)
  }

  const handleCancel = () => {
    setTreatmentToEdit({})
    setShowForm(false)
  }

  const openDeleteModal = (treatment) => {
    setTreatmentToDelete(treatment)
  }

  const handleConfirmDelete = async (treatment) => {
    

    try {
      const res = await api.delete(`/treatments/${treatment.code}`)
      console.log('Response:', res.data) 
      dispatch({
        type: 'DELETE_TREATMENT',
        code: treatment.code
      })
    } catch (error) {

    }

    setTreatmentToDelete(null)
  }


  return (
    <div className='flex flex-col pt-4'>
      {/* <h1 className='font-xl font-semibold'>Treatment List</h1> */}

      <div className='flex flex-col-reverse gap-3 w-full max-w-3xl items-start justify-between relative'>
        <TreatmentList
          treatments={treatments}
          onEdit={handleEditTreatment}
          onSubmit={handleUpdateTreatment}
          onDelete={openDeleteModal}
        />

        {treatmentToDelete && (
          <Modal>
            <div className='max-w-xl bg-zinc-100 rounded-lg p-4 text-center flex flex-col gap-4'>
              <div>Are you sure you want to delete this treatment?</div>
              <div className='w-full flex justify-around'>
                <button
                  onClick={() => setTreatmentToDelete(null)}
                  className='cursor-pointer bg-zinc-600 text-zinc-50 px-4 py-2 rounded-full'
                  >
                  Cancel
                </button>

                <button
                  onClick={() => handleConfirmDelete(treatmentToDelete)}
                  className='cursor-pointer bg-rose-400 rounded-full px-4 py-2'
                >
                  Delete
                </button>
              </div>
            </div>
          </Modal>
        )}
        <div className='w-full flex justify-end h-12'>
        {showForm ? (
          <TreatmentForm
            onSubmit={isEditMode ? handleUpdateTreatment : handleAddTreatment}
            onCancel={() => handleCancel()}
            initialData={treatmentToEdit}
          />
        ) : (
          
          <button 
            onClick={() => setShowForm(true)}
            className='h-12 bg-blue-500 rounded-full px-4 py-2 cursor-pointer'>
            Add Treatment Item
          </button>
        )}
        </div>


      </div>
    </div>
  )
}

export default TreatmentPage