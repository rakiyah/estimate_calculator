import { useState, useEffect } from 'react';
import api from '../../api/axios'

const TreatmentList = () => {
  const [treatments, setTreatments] = useState([])

  useEffect(() => {
    api.get('/treatments')
      .then((res) => {
        console.log('Res:', res.data)
        setTreatments(res.data);
      })
      .catch((err) => {
        console.error('Error fetching treatments:', err);
      });
  }, []);

  return (
    <div className=''>
      
    </div>
  )
}

export default TreatmentList