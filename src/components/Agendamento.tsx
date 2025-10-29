import React, { useMemo, useState } from "react";

export type PetOption = {
  id: string;
  nome: string;
};

export type ServicoOption = {
  id: string;
  nome: string;
};

export type AgendamentoPayload = {
  clienteId: string;
  petId: string;
  servico: string;
  dataInicio: string; // ISO string
};

type AgendamentoWizardProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirmed?: (payload: AgendamentoPayload) => void;
  clienteId?: string;
  pets?: PetOption[];
  servicos?: ServicoOption[];
};

const defaultPets: PetOption[] = [
  { id: "pet-1", nome: "Rex" },
  { id: "pet-2", nome: "Luna" },
];

const defaultServicos: ServicoOption[] = [
  { id: "serv-1", nome: "Banho Simples" },
  { id: "serv-2", nome: "Tosa Completa" },
  { id: "serv-3", nome: "Banho e Tosa" },
];

function fmtDateISO(date: Date, timeHHMM: string) {
  const [h, m] = timeHHMM.split(":").map(Number);
  const d = new Date(date);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
}

function isSameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function generateTimeSlots(date: Date, start = 9, end = 18, stepMin = 30) {
  const slots: string[] = [];
  const now = new Date();
  for (let h = start; h < end; h++) {
    for (let m = 0; m < 60; m += stepMin) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      const time = `${hh}:${mm}`;
      const slotDate = new Date(date);
      slotDate.setHours(h, m, 0, 0);
      if (isSameDate(date, now) && slotDate < now) continue;
      slots.push(time);
    }
  }
  return slots;
}

export default function AgendamentoWizard({
  isOpen,
  onClose,
  onConfirmed,
  clienteId = "cliente-demo-123",
  pets = defaultPets,
  servicos = defaultServicos,
}: AgendamentoWizardProps) {
  const [step, setStep] = useState(1);
  const [petId, setPetId] = useState(pets[0]?.id ?? "");
  const [servicoId, setServicoId] = useState(servicos[0]?.id ?? "");
  const [servicoNome, setServicoNome] = useState(servicos[0]?.nome ?? "");
  const [dateStr, setDateStr] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });
  const [time, setTime] = useState("");
  const selectedDate = useMemo(() => new Date(dateStr + "T00:00:00"), [dateStr]);

  const timeSlots = useMemo(() => generateTimeSlots(selectedDate), [selectedDate]);

  const petNome = useMemo(() => pets.find((p) => p.id === petId)?.nome ?? "", [petId, pets]);

  function resetAndClose() {
    setStep(1);
    setTime("");
    onClose();
  }

  function canGoNext() {
    if (step === 1) return Boolean(petId && servicoId);
    if (step === 2) return Boolean(dateStr && time);
    return true;
  }

  function goNext() {
    if (!canGoNext()) return;
    setStep((s) => Math.min(3, s + 1));
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  function handleServicoChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value;
    setServicoId(id);
    const nome = servicos.find((s) => s.id === id)?.nome ?? "";
    setServicoNome(nome);
  }

  async function handleConfirm() {
    if (!petId || !servicoNome || !dateStr || !time) return;

    const dataInicioISO = fmtDateISO(selectedDate, time);
    const payload: AgendamentoPayload = {
      clienteId,
      petId,
      servico: servicoNome,
      dataInicio: dataInicioISO,
    };

    onConfirmed?.(payload);

    // Implementar chamada HTTP aqui (fetch/axios) para enviar `payload` ao backend.
    // Ex.: await fetch('/api/agendamentos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

    resetAndClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={resetAndClose} />
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-4 sm:p-6 m-0 sm:m-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold">Agendar Serviço</h2>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={resetAndClose}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <div className="mt-3">
          <ol className="flex items-center gap-2 text-xs sm:text-sm">
            <li className={`flex-1 text-center py-2 rounded ${step >= 1 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>1. Pet & Serviço</li>
            <li className={`flex-1 text-center py-2 rounded ${step >= 2 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>2. Data & Hora</li>
            <li className={`flex-1 text-center py-2 rounded ${step >= 3 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>3. Revisão</li>
          </ol>
        </div>

        {step === 1 && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Pet a ser Atendido</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={petId}
                onChange={(e) => setPetId(e.target.value)}
              >
                {pets.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Serviço Desejado</label>
              <select
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={servicoId}
                onChange={handleServicoChange}
              >
                {servicos.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Data</label>
              <input
                type="date"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Horário</label>
              <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                {timeSlots.length === 0 && (
                  <div className="col-span-full text-sm text-gray-500">Sem horários disponíveis</div>
                )}
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={`px-3 py-2 rounded border text-sm ${
                      time === t
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">O horário selecionado define o início do atendimento. O cálculo de dataFinal e valorFinal será feito pelo backend.</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-gray-200 p-3 bg-gray-50">
              <div className="text-sm text-gray-700">Pet</div>
              <div className="font-medium">{petNome}</div>
              <div className="mt-2 text-sm text-gray-700">Serviço</div>
              <div className="font-medium">{servicoNome}</div>
              <div className="mt-2 text-sm text-gray-700">Data</div>
              <div className="font-medium">{new Date(dateStr).toLocaleDateString()}</div>
              <div className="mt-2 text-sm text-gray-700">Horário</div>
              <div className="font-medium">{time}</div>
              <div className="mt-3 text-sm text-gray-700">Valor Estimado (A ser confirmado pelo Pet Shop):</div>
              <div className="text-lg font-semibold text-emerald-700">R$ 50,00</div>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={step === 1 ? resetAndClose : goBack}
          >
            {step === 1 ? "Cancelar" : "Voltar"}
          </button>

          {step < 3 ? (
            <button
              type="button"
              disabled={!canGoNext()}
              className={`px-4 py-2 rounded-md text-white ${
                canGoNext() ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-300 cursor-not-allowed"
              }`}
              onClick={goNext}
            >
              Continuar
            </button>
          ) : (
            <button
              type="button"
              className="px-4 py-2 rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
              onClick={handleConfirm}
              
            >
              <a href="/agendamentos">Confirmar Agendamento</a>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
