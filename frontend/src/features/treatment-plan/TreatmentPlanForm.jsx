
import categories from "../../data/categories"
import LineItem from "./LineItem"

const colStyles = {
  code: 'w-20',
  category: 'w-24',
  description: 'w-40',
  fee: 'w-20',
  covered: 'w-24',
  write_off: 'w-24',
}

const TreatmentPlanForm = ({ treatments, lineItems, setLineItems, onSet }) => {
  
  const getTotal = () => {
    let total = 0
    lineItems.map((item) => {
      total += Number(item.fee)
    })
    return total
  }

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
        i === index ? { ...item, category: newCategory } : item
      )
    )
    const treatmentsInCategory = treatments.filter(t => t.category === newCategory)
    setLineItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, line_items: treatmentsInCategory } : item
      )
    )
  }

  const handleSelectTreatment = (index, treatment) => {
    setLineItems(prev =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              code: treatment.code,
              description: treatment.description,
              fee: treatment.fee,
              covered: treatment.covered || '',
              write_off: treatment.write_off || ''
            }
          : item
      )
    )
  }

  const handleLineItemChange = (index, name, value) => {
    setLineItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    )
  } 

  const handleDeleteLineItem = (index) => {
    setLineItems(prev =>
      prev.filter((_, i) => i !== index)
    )
  }

  const handleDuplicateItem = (item) => {
    setLineItems(
      [
        ...lineItems,
        item
      ]
    )
  }

  const handleSetTreatmentPlan = () => {
    onSet(lineItems)
  }

  return (
    <div className="w-full text-xs overflow-visible flex flex-col gap-2">
      <div className="flex justify-between">
        <h1 className="w-fit text-lg font-semibold">Treatment Plan</h1>
        <button 
          onClick={handleAddItem}
          className="px-4 py-1 rounded-full bg-emerald-400 cursor-pointer"
          >
          Add Item
        </button>
      </div>

      <div className="w-full">
        <div className="flex border-b font-semibold text-sm">
          <div className={`px-2 py-1 ${colStyles.code}`}>Code</div>
          <div className={`px-2 py-1 ${colStyles.category}`}>Category</div>
          <div className={`px-2 py-1 ${colStyles.description}`}>Description</div>
          <div className={`px-2 py-1 ${colStyles.fee}`}>Fee</div>
          <div className={`px-2 py-1 ${colStyles.covered}`}>Covered</div>
          <div className={`px-2 py-1 ${colStyles.writeOff}`}>Write-Off</div>
        </div>


        {lineItems.map((item, index) => (
          <LineItem 
            item={item}
            categories={categories}
            colStyles={colStyles}
            handleSelectCategory={handleSelectCategory}
            handleSelectTreatment={handleSelectTreatment}
            index={index}
            onChangeItem={handleLineItemChange}
            onDelete={handleDeleteLineItem}
            onDuplicate={handleDuplicateItem}
          />
        ))}
      </div>

      {lineItems.length > 0 && (
        <div className=" flex gap-5 items-center justify-around mt-2">
          <button
            onClick={handleSetTreatmentPlan}
            className="bg-emerald-400 px-4 py-1 rounded-full cursor-pointer">
            Set Treatment Plan
          </button>
          <div className="flex items-center gap-4 text-lg font-semibold ">
            <div className="">Total</div>
            <div>${getTotal()}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TreatmentPlanForm