import * as XLSX from 'xlsx'

/**
 * Exports student data to an Excel file
 * @param {Array} students - Array of student objects
 * @param {string} filename - Name of the file to download
 */
export function exportToExcel(students, filename = 'students.xlsx') {
  const worksheet = XLSX.utils.json_to_sheet(
    students.map(({ id, name, email, age }) => ({ Name: name, Email: email, Age: age }))
  )
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Students')
  XLSX.writeFile(workbook, filename)
}
