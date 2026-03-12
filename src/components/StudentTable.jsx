function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
        <p className="text-slate-500">No students to display.</p>
        <p className="text-slate-400 text-sm mt-1">Add a student using the form above.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Age</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 text-slate-900">{student.name}</td>
                <td className="px-4 py-3 text-slate-600">{student.email}</td>
                <td className="px-4 py-3 text-slate-600">{student.age}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => onEdit(student)}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium mr-3"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(student)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentTable
