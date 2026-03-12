import { useState, useEffect } from 'react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function StudentForm({ student, onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [errors, setErrors] = useState({})

  const isEditing = !!student

  useEffect(() => {
    if (student) {
      setName(student.name)
      setEmail(student.email)
      setAge(String(student.age))
    } else {
      setName('')
      setEmail('')
      setAge('')
    }
    setErrors({})
  }, [student])

  function validate() {
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!age.trim()) {
      newErrors.age = 'Age is required'
    } else {
      const ageNum = Number(age)
      if (Number.isNaN(ageNum) || !Number.isInteger(ageNum) || ageNum < 1 || ageNum > 150) {
        newErrors.age = 'Age must be a valid number (1-150)'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    const ageNum = parseInt(age, 10)
    if (isEditing) {
      onSubmit({ ...student, name: name.trim(), email: email.trim(), age: ageNum })
    } else {
      onSubmit({ name: name.trim(), email: email.trim(), age: ageNum })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">
        {isEditing ? 'Edit Student' : 'Add Student'}
      </h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.name ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="Enter full name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.email ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="email@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-1">
          Age
        </label>
        <input
          id="age"
          type="text"
          inputMode="numeric"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            errors.age ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="Enter age"
        />
        {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {isEditing ? 'Save Changes' : 'Add Student'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default StudentForm
