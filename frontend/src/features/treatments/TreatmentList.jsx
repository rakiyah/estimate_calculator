import { useState, useEffect, useReducer } from 'react';
import api from '../../api/axios'
import { treatmentReducer } from '../../hooks/treatmentReducer';
import AddTreatment from '../add-treatment/AddTreatment';

const TreatmentList = ({ treatments }) => {

  console.log('treatments:', treatments)

  return (
    <div className='flex flex-col gap-2'>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Category</th>
            <th>Description</th>
            <th>Fee</th>
            <th>Covered</th>
            <th>Write Off</th>
          </tr>
        </thead>

        <tbody>
          {treatments.map((t) => (
            <tr
              key={t.code}
              className='flex flex-row gap-4'
              >
              <td>{t.code}</td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  )
}

export default TreatmentList