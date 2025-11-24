import { useEffect, useState } from 'react';
import { listarAgendamentos, atualizarStatusAgendamento } from '../services/agendamentoService';
import type { Agendamento } from '../services/agendamentoService';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

export default function AgendamentosFuncionario() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSelecionada, setDataSelecionada] = useState<string>(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    carregarAgendamentos();
  }, [dataSelecionada]);

  const carregarAgendamentos = async () => {
    try {
      setLoading(true);
      const dados = await listarAgendamentos();
      
      // Aplicar filtros
      let agendamentosFiltrados = [...dados];
      
      // Filtrar por data
      if (dataSelecionada) {
        agendamentosFiltrados = agendamentosFiltrados.filter(
          agendamento => agendamento.data === dataSelecionada
        );
      }
      
     
      // Ordenar por horário
      agendamentosFiltrados.sort((a, b) => {
        if (a.data === b.data) {
          return a.horario.localeCompare(b.horario);
        }
        return a.data.localeCompare(b.data);
      });
      
      setAgendamentos(agendamentosFiltrados);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar agendamentos:', err);
      setError('Erro ao carregar os agendamentos. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleAtualizarStatus = async (id: number, novoStatus: 'CONCLUIDO' | 'CANCELADO') => {
    try {
      await atualizarStatusAgendamento(id, novoStatus);
      // Atualizar o status localmente para evitar recarregar todos os dados
      setAgendamentos(agendamentos.map(agendamento => 
        agendamento.id === id 
          ? { ...agendamento, status: novoStatus } 
          : agendamento
      ));
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      setError('Não foi possível atualizar o status do agendamento. Tente novamente.');
    }
  };

  const formatarData = (data: string) => {
    try {
      return format(parseISO(data), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch (e) {
      console.error('Erro ao formatar data:', e);
      return data;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'AGENDADO':
        return 'bg-blue-100 text-blue-800';
      case 'CONCLUIDO':
        return 'bg-green-100 text-green-800';
      case 'CANCELADO':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && agendamentos.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">
            Carregando agendamentos...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
              Agendamentos
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-1">
                  Filtrar por data:
                </label>
                <input
                  type="date"
                  id="data"
                  value={dataSelecionada}
                  onChange={(e) => setDataSelecionada(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {agendamentos.length === 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum agendamento encontrado</h3>
          </div>
        ) : (
          <div className="space-y-4">
            {agendamentos.map((agendamento) => (
              <div key={agendamento.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-start sm:items-center flex-col sm:flex-row">
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {agendamento.animal.nome} - {agendamento.servico}
                      </h3>
                      <span className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(agendamento.status)}`}>
                        {agendamento.status === 'AGENDADO' ? 'Em Aberto' : agendamento.status}
                      </span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Data & Hora:</span> {formatarData(agendamento.data)} • {agendamento.horario}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Valor Final:</span> R$ {agendamento.valor.toFixed(2).replace('.', ',')}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Status:</span> {agendamento.status === 'AGENDADO' ? 'Em Aberto' : agendamento.status}
                      </p>
                    </div>
                  </div>
                  {agendamento.status === 'AGENDADO' && (
                    <div className="flex space-x-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleAtualizarStatus(agendamento.id, 'CONCLUIDO')}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Marcar como Concluído
                      </button>
                      <button
                        onClick={() => handleAtualizarStatus(agendamento.id, 'CANCELADO')}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Dono</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {agendamento.animal.cliente.nome} - {agendamento.animal.cliente.telefone}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Animal</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {agendamento.animal.nome} - {agendamento.animal.especie} ({agendamento.animal.raca})
                      </dd>
                    </div>
                    {agendamento.observacoes && (
                      <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Observações</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          {agendamento.observacoes}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
