import { FiEdit3, FiTrash2 } from "react-icons/fi";

const TreatmentList = ({ treatments, onEdit, onDelete }) => {

  return (
    <div className='flex flex-col text-sm gap-2 overflow-hidden rounded-lg border border-blue-900'>
      <table className="">
        <thead>
          <tr>
            <th className='px-4 py-2'>Code</th>
            <th className='px-4 py-2 text-center'>Category</th>
            <th className='px-4 py-2'>Description</th>
            <th className='px-4 py-2'>Fee</th>
            <th className='px-4 py-2 text-center'>Covered</th>
            <th className='px-4 py-2'>WriteOff</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody>
          {treatments.map((t) => (
            <tr
              key={t.code}
              className='odd:bg-blue-100 last:rounded-b-lg'
              >
              <td className='px-4 py-1'>{t.code}</td>
              <td className='px-4 py-1 text-center'>{t.category}</td>
              <td className='px-4 py-1 w-64 truncate text-center'>{t.description}</td>
              <td className='px-4 py-1'>${t.fee}</td>
              <td className='px-4 py-1 text-center'>{t.covered ? 'Yes' : 'No'}</td>
              <td className='px-4 py-1'>${t.write_off || 0}</td>
              <td className="px-4 py-1 flex gap-2">
                <div 
                  onClick={() => onEdit(t)}
                  className="cursor-pointer">
                  <FiEdit3 className="text-xl" />
                </div>
                <div 
                  onClick={() => onDelete(t)}
                  className="cursor-pointer">
                  <FiTrash2 className="text-xl" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  )
}

export default TreatmentList