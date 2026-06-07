export default function Header() {
  const current_date = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col gap-1 border-b border-slate-200 pb-6">
      <h1 className="text-2xl font-bold text-slate-950">Kalkulator HPP</h1>
      <p className="text-sm text-slate-500">{current_date}</p>
    </div>
  )
}
