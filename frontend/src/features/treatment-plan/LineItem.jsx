import { useState } from "react";
import Dropdown from "../../components/Dropdown"
import TreatmentDropdown from "../../components/TreatmentDropdown"
import { FiEdit3, FiTrash2, FiCopy, FiX } from "react-icons/fi";

const LineItem = ({ 
  item, 
  colStyles,
  handleSelectCategory,
  handleSelectTreatment,
  index,
  categories,
  onChangeItem,
  onDelete,
  onDuplicate
}) => {
  const [editFee, setEditFee] = useState(false)
  const [editWriteOff, setEditWriteOff] = useState(false)

  console.log('item:', item)
  const handleChangeItem = (e) => {
    const { name, value } = e.target
    onChangeItem(index, name, value)
  }

  return (
    <div key={index} className="flex border-b items-center text-sm">
      <div className={`px-2 py-1 ${colStyles.code}`}>{item.code || ''}</div>

      <div className={`px-2 py-1 ${colStyles.category}`}>
        {item.category ? (
          <span>{item.category}</span>
        ) : (
          <Dropdown
            options={categories}
            width="w-24"
            onChange={(name, category) => handleSelectCategory(index, category)}
          />
        )}
      </div>

      <div className={`px-2 py-1 ${colStyles.description}`}>
        {item.description ? (
          <span>{item.description}</span>
        ) : (
          <TreatmentDropdown
            treatmentsByCategory={item.line_items}
            onSelect={(t) => handleSelectTreatment(index, t)}
          />
        )}
      </div>

      <div className={`px-2 py-1 ${colStyles.fee} flex items-center gap-2`}>
        {editFee ? (
          <div className="flex items-center">
            <span>$</span>
            <input
              name='fee'
              onChange={handleChangeItem}
              value={item.fee}
              className={`w-12 border border-blue-500 rounded-lg px-1`}
            />
            <div
              onClick={() => setEditFee(false)} 
              className="cursor-pointer">
              <FiX />
            </div>
          </div>
        ) : (
          <>
            <span>{item.fee ? `$${item.fee}` : ''}</span>
            <div 
              onClick={() => setEditFee(true)}
              className="cursor-pointer">
              {item.fee && <FiEdit3 />}
            </div>
          </>
        )}
      </div>
      <div className={`px-2 py-1 ${colStyles.covered}`}>
        {item.covered ? 'Yes' : 'No'}
      </div>
      <div className={`px-2 py-1 ${colStyles.write_off} flex items-center gap-2`}>
        {editWriteOff ? (
          <div className="flex items-center">
            <span>$</span>
            <input
              name='write_off'
              onChange={handleChangeItem}
              value={item.write_off}
              className={`w-12 border border-blue-500 rounded-lg px-1`}
            />
            <div
              onClick={() => setEditWriteOff(false)} 
              className="cursor-pointer">
              <FiX />
            </div>            
          </div>
        ) : (
          <>
            <span>{item.write_off ? `$${item.write_off}` : ''}</span>
            <div 
              onClick={() => setEditWriteOff(true)}
              className="cursor-pointer">
              {item.write_off && <FiEdit3 />}
            </div>
          </>
        )}
      </div>
      <div className="w-8 flex justify-center">
        <div 
          onClick={() => onDelete(index)}
          className="cursor-pointer p-2">
          <FiTrash2 />
        </div>
      </div>

      <div className="w-8 flex justify-center">
        <div 
          onClick={() => onDuplicate(item)}
          className="cursor-pointer p-2">
          <FiCopy />
        </div>
      </div>
    </div>
  )
}

export default LineItem