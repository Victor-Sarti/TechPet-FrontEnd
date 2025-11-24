import React, { useMemo, useState } from "react";

export type AgendamentoListItem = {
  id: string;
  nomeDoPet: string;
  servico: string;
  dataInicio: string; // ISO
  dataFinal: string; // ISO
  finalizado: boolean;
  valorFinal?: number | null; // pode ser nulo quando pendente
};

function formatDateTimeRange(startIso: string, endIso: string) {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const date = start.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const hStart = start.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  const hEnd = end.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  return `${date} • ${hStart} - ${hEnd}`;
}

function formatCurrencyBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const mockData: AgendamentoListItem[] = [
  {
    id: "ag-1",
    nomeDoPet: "Max",
    servico: "Banho e Tosa",
    dataInicio: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // amanhã
    dataFinal: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
    finalizado: false,
    valorFinal: null,
  },
  {
    id: "ag-2",
    nomeDoPet: "Bob",
    servico: "Tosa Completa",
    dataInicio: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // -6 dias
    dataFinal: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(),
    finalizado: true,
    valorFinal: 80,
  },
];

const TABS = [
  { key: "proximos", label: "Próximos" },
  { key: "historico", label: "Histórico" },
] as const;

type TabKey = typeof TABS[number]["key"];

const MeusAgendamentos: React.FC = () => {
  const [active, setActive] = useState<TabKey>("proximos");
  const now = Date.now();

  const proximos = useMemo(
    () =>
      mockData
        .filter((a) => !a.finalizado && new Date(a.dataInicio).getTime() > now)
        .sort((a, b) => new Date(a.dataInicio).getTime() - new Date(b.dataInicio).getTime()),
    [now]
  );

  const historico = useMemo(
    () =>
      mockData
        .filter((a) => a.finalizado === true)
        .sort((a, b) => new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime()),
    []
  );

  const list = active === "proximos" ? proximos : historico;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white px-4 py-8">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Meus Agendamentos</h1>
          <p className="text-slate-600 text-sm mt-1">Acompanhe seus serviços no TechPet.</p>
        </header>

        <div className="mb-6 inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                active === tab.key
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            {active === "proximos"
              ? "Você não tem agendamentos futuros no momento."
              : "Sem itens no histórico."}
          </div>
        ) : (
          <ul className="space-y-4">
            {list.map((a) => (
              <li key={a.id}>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-slate-900 font-semibold text-base sm:text-lg">
                        {a.nomeDoPet}
                      </div>
                      <div className="text-slate-700 text-sm">{a.servico}</div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium border ${
                        a.finalizado
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-sky-50 text-sky-700 border-sky-200"
                      }`}
                    >
                      {a.finalizado ? "Finalizado" : "Agendado / Em Aberto"}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
                      <div className="text-slate-500">Data & Hora</div>
                      <div className="text-slate-800 font-medium">
                        {formatDateTimeRange(a.dataInicio, a.dataFinal)}
                      </div>
                    </div>
                    <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
                      <div className="text-slate-500">Valor Final</div>
                      <div className="text-slate-800 font-medium">
                        {a.finalizado
                          ? formatCurrencyBRL(a.valorFinal ?? 0)
                          : "120,00"}
                      </div>
                    </div>
                    <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
                      <div className="text-slate-500">Status</div>
                      <div className="text-slate-800 font-medium">
                        {a.finalizado ? "Concluído" : "Em Aberto"}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MeusAgendamentos;
