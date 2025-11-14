import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Agendamento = {
  id: string
  dataInicio: string // ISO datetime
  dataFinal: string // ISO datetime
  servico: string
  nomeDoPet: string
  especieDoPet: string
  nomeDoCliente: string
  telefoneDoCliente: string
  valorFinal: number
  finalizado: boolean
}

function formatDateInput(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatHourRange(startISO: string, endISO: string) {
  const s = new Date(startISO)
  const e = new Date(endISO)
  const fmt = (dt: Date) => dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return `${fmt(s)} - ${fmt(e)}`
}

export default function FuncionarioDashboard() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState<string>(formatDateInput(new Date()))
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(() => {
    const today = formatDateInput(new Date())
    const tomorrow = (() => {
      const d = new Date()
      d.setDate(d.getDate() + 1)
      return formatDateInput(d)
    })()

    const compose = (
      id: string,
      day: string,
      start: string,
      end: string,
      servico: string,
      pet: string,
      especie: string,
      cliente: string,
      tel: string,
      valor: number,
    ): Agendamento => ({
      id,
      dataInicio: `${day}T${start}:00`,
      dataFinal: `${day}T${end}:00`,
      servico,
      nomeDoPet: pet,
      especieDoPet: especie,
      nomeDoCliente: cliente,
      telefoneDoCliente: tel,
      valorFinal: valor,
      finalizado: false,
    })

    return [
      compose('1', today, '09:00', '09:45', 'Banho', 'Thor', 'Cão', 'Ana Souza', '(11) 91234-0001', 60),
      compose('2', today, '10:00', '11:00', 'Tosa Completa', 'Mia', 'Gato', 'Carlos Lima', '(11) 91234-0002', 120),
      compose('3', today, '11:15', '11:45', 'Banho', 'Luna', 'Cão', 'Beatriz Nunes', '(11) 91234-0003', 60),
      compose('4', today, '13:30', '14:30', 'Hidratação', 'Simba', 'Cão', 'Paulo Mendes', '(11) 91234-0004', 90),
      compose('5', today, '15:00', '16:00', 'Tosa Higiênica', 'Nina', 'Gato', 'Julia Alves', '(11) 91234-0005', 80),
      compose('6', tomorrow, '09:00', '09:45', 'Banho', 'Bob', 'Cão', 'Rita Dias', '(11) 91234-0006', 60),
    ]
  })

  const pendentesDoDia = useMemo(() => {
    return agendamentos.filter((a) => !a.finalizado && a.dataInicio.slice(0, 10) === selectedDate)
  }, [agendamentos, selectedDate])

  const totalPendentes = pendentesDoDia.length

  async function finalizar(id: string) {
    try {
      setAgendamentos((prev) => prev.map((a) => (a.id === id ? { ...a, finalizado: true } : a)))
      // Aqui você deve chamar sua API para atualizar o agendamento (ex.: PATCH /api/agendamentos/:id { finalizado: true })
      // Exemplo: await fetch(`/api/agendamentos/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ finalizado: true }) })
      await finalizarAgendamento(Number(id))
    } catch (e) {
      setAgendamentos((prev) => prev.map((a) => (a.id === id ? { ...a, finalizado: false } : a)))
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900">Agenda de Serviços Diária</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/equipe/login')}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 flex items-end gap-4">
            <div className="flex-1">
              <label htmlFor="data" className="block text-sm font-medium text-slate-700">
                Data
              </label>
              <input
                id="data"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-sm text-slate-500">Pendentes no dia</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">{totalPendentes}</div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Horário</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Serviço</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Pet</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Cliente</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Valor</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {pendentesDoDia.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    Nenhum agendamento pendente para a data selecionada.
                  </td>
                </tr>
              ) : (
                pendentesDoDia.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-900 whitespace-nowrap">
                      {formatHourRange(a.dataInicio, a.dataFinal)}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{a.servico}</td>
                    <td className="px-4 py-3 text-slate-700">
                      <div className="font-medium text-slate-900">{a.nomeDoPet}</div>
                      <div className="text-sm text-slate-500">{a.especieDoPet}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      <div className="font-medium text-slate-900">{a.nomeDoCliente}</div>
                      <div className="text-sm text-slate-500">{a.telefoneDoCliente}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">R$ {a.valorFinal.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => finalizar(a.id)}
                        className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                      >
                        Finalizar Serviço
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
