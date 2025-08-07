import { useState } from "react"
import Checkbox from "../../components/Checkbox"
import Dropdown from "../../components/Dropdown"
import categories from "../../data/categories"

const TreatmentForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [form, setForm] = useState({
    moda: initialData.moda || false,
    code: initialData.code || '',
    description: initialData.description || '',
    fee: initialData.fee || '',
    covered: initialData.covered || false,
    write_off: initialData.write_off || '',
    category: initialData.category || '',
  })


  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleCategoryChange = (name, val) => {
    setForm((prev) => ({ ...prev, [name]: val }))
  }

  const handleCheckboxChange = (name, val) => {
    setForm((prev) => ({ ...prev, [name]: val }))
  }

  return (
    <div className='flex flex-col gap-4 bg-zinc-50 border border-blue-900 absolute p-3 rounded-lg z-10 top-2 right-2'>
      <form className="flex flex-col gap-2 max-w-2xl w-full">
        <label className='flex flex-row items-center justify-between gap-2'>
          <div className="uppercase">Category</div>
          <Dropdown
            name='category'
            onChange={handleCategoryChange}
            options={categories}
            initialOption={
              categories.find(cat => cat.id === form.category) || null
            }
          />
        </label>
        
        <label className='flex flex-row items-center justify-between gap-2'>
          <div className="uppercase">Code</div>
          <input
            name='code'
            type="text"
            value={form.code}
            onChange={handleChange}
            className="px-2 py-0.5 rounded-lg border border-blue-900"
          />
        </label>

        <label className="flex flex-row items-center justify-between gap-2">
          <div className="uppercase">Description</div>
          <input 
            name='description'
            type="text"
            value={form.description}
            onChange={handleChange}
            className="px-2 py-0.5 rounded-lg border border-blue-900"
          />
        </label>

        <label className="flex flex-row items-center justify-between gap-2">
          <div className="uppercase">Fee</div>
          <input 
            name='fee'
            type="number"
            value={form.fee}
            onChange={handleChange}
            className="px-2 py-0.5 rounded-lg border border-blue-900"
          />
        </label>

        <Checkbox 
          checked={form.covered}
          val='covered'
          onChange={handleCheckboxChange}
        />     

        <label className="flex flex-row items-center justify-between gap-2">
          <div className="uppercase">Write OFf</div>
          <input 
            name='write_off'
            type="number"
            value={form.write_off}
            onChange={handleChange}
            className="px-2 py-0.5 rounded-lg border border-blue-900"
          />
        </label>     
      </form>

    <div className="w-full flex justify-between">
      <button 
        onClick={onCancel}
        className='bg-rose-400 cursor-pointer px-8 py-2 rounded-full'>
          Cancel
      </button>

      <button 
        onClick={() => onSubmit(form)}
        className='bg-emerald-400 cursor-pointer px-8 py-2 rounded-full'>
          Submit
      </button>
    </div>

    </div>
  )
}

export default TreatmentForm