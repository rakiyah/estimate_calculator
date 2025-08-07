import { useState } from "react"
import categories from "../../data/categories"
import Dropdown from "../../components/Dropdown"
import TreatmentDropdown from "../../components/TreatmentDropdown"

const TreatmentPlanForm = ({ treatments }) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTreatment, setSelectedTreatment] = useState({})
  const [lineItems, setLineItems] = useState([])

  const treatmentsInCategory = treatments.filter(t => t.category === selectedCategory.id)

  // const total = lineItems.reduce((sum, item) => {
  //   sum + Number(item.fee)
  // }, 0)


  const handleAddItem = () => {
    setLineItems([
      ...lineItems, 
      {
        category: '',
        code: '',
        description: '',
        fee: '',
        covered: '',
        write_off: '',
        line_items: []
      }
    ])
  }

  const handleSelectCategory = (index, newCategory) => {
    setLineItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, category: newCategory } : item.category
      )
    )
    const treatmentsInCategory = treatments.filter(t => t.category === newCategory)
    setLineItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, line_items: treatmentsInCategory } : item.line_items
      )
    )
  }

  const handleLineItemChange = (index, item) => {

  } 

  return (
    <div className="max-w-xs w-full text-sm overflow-visible">
      <div className="flex justify-between">
        <h1 className="w-fit text-lg font-semibold">Treatment Plan</h1>
        <button 
          onClick={handleAddItem}
          className="px-4 py-1 rounded-full bg-emerald-400 cursor-pointer"
          >
          Add Item
        </button>
      </div>

      <table className="">
        <thead>
          <tr>
            <th className='px-4 py-2'>Code</th>
            <th className='px-4 py-2 text-center'>Category</th>
            <th className='px-4 py-2'>Description</th>
            <th className='px-4 py-2'>Fee</th>
            <th className='px-4 py-2 text-center'>Covered</th>
            <th className='px-4 py-2'>WriteOff</th>
          </tr>
        </thead>

        <tbody>
          {lineItems.map((item, index) => (
            <tr
              key={index}
              className='odd:bg-blue-100 last:rounded-b-lg'
              >
              <td className='px-4 py-1'>{item?.code || ''}</td>
              <td className='px-4 py-1 text-center'>
                {item.category ? (
                  <span>{item.category}</span>
                ) : (
                  <Dropdown 
                    options={categories}
                    width='w-32'
                    onChange={(name, category) => {
                      handleSelectCategory(index, category)
                    }}
                  />
                )}
              </td>
              <td className='px-4 py-1 w-64 truncate text-center'>                
                {item.description ? (
                  <span>{item.description}</span>
                ) : (
                  <TreatmentDropdown 
                    treatmentsByCategory={item.line_items}

                  />
                )}
              </td>
              <td className='px-4 py-1'>${item.fee}</td>
              <td className='px-4 py-1 text-center'>{item.covered}</td>
            <td className='px-4 py-1'>{`$${item.write_off}` || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TreatmentPlanForm