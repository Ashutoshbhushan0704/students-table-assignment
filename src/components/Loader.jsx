function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
      <p className="text-slate-500 text-sm">Loading students...</p>
    </div>
  )
}

export default Loader
