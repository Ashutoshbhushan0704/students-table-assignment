import { useState, useEffect, useMemo } from 'react'
import { initialStudents } from './data/studentsData'
import { exportToExcel } from './utils/excelExport'
import StudentTable from './components/StudentTable'
import StudentForm from './components/StudentForm'
import ConfirmDialog from './components/ConfirmDialog'
import Loader from './components/Loader'

function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingStudent, setEditingStudent] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(initialStudents.map((s) => ({ ...s })))
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) return students
    const term = searchTerm.toLowerCase()
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        String(s.age).includes(term)
    )
  }, [students, searchTerm])

  function generateId() {
    const maxId = students.reduce((max, s) => (s.id > max ? s.id : max), 0)
    return maxId + 1
  }

  function handleAddStudent(data) {
    setStudents((prev) => [...prev, { ...data, id: generateId() }])
    setEditingStudent(null)
  }

  function handleEditStudent(data) {
    setStudents((prev) =>
      prev.map((s) => (s.id === data.id ? { ...data } : s))
    )
    setEditingStudent(null)
  }

  function handleFormSubmit(data) {
    if (data.id) {
      handleEditStudent(data)
    } else {
      handleAddStudent(data)
    }
  }

  function handleDeleteConfirm() {
    if (deleteTarget) {
      setStudents((prev) => prev.filter((s) => s.id !== deleteTarget.id))
      setDeleteTarget(null)
    }
  }

  function handleExportExcel() {
    const dataToExport = searchTerm.trim() ? filteredStudents : students
    const suffix = searchTerm.trim() ? '-filtered' : ''
    exportToExcel(dataToExport, `students${suffix}.xlsx`)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Students Table Management</h1>
          <p className="text-slate-600 mt-1">Manage student records with CRUD operations</p>
        </header>

        <div className="space-y-6">
          <StudentForm
            student={editingStudent}
            onSubmit={handleFormSubmit}
            onCancel={() => setEditingStudent(null)}
          />

          <section>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <input
                type="text"
                placeholder="Search by name, email, or age..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 max-w-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleExportExcel}
                disabled={students.length === 0}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Download Excel
              </button>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <StudentTable
                students={filteredStudents}
                onEdit={setEditingStudent}
                onDelete={setDeleteTarget}
              />
            )}
          </section>
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Student"
        message="Are you sure you want to delete this student?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}

export default App
