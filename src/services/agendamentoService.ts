
export interface Agendamento {
  id: number;
  data: string;
  horario: string;
  status: 'AGENDADO' | 'CONCLUIDO' | 'CANCELADO';
  animal: {
    id: number;
    nome: string;
    especie: string;
    raca: string;
    cliente: {
      id: number;
      nome: string;
      telefone: string;
    };
  };
  servico: string;
  observacoes?: string;
  valor: number;
}

export const listarAgendamentos = async (): Promise<Agendamento[]> => {
  try {
    // Simulando uma chamada de API com dados mockados
    const mockAgendamentos: Agendamento[] = [
      {
        id: 1,
        data: '2025-11-25',
        horario: '14:00',
        status: 'AGENDADO',
        animal: {
          id: 4,
          nome: 'Max',
          especie: 'Cão',
          raca: 'Pastor Alemão',
          cliente: {
            id: 4,
            nome: 'Kaik',
            telefone: '(11) 94658-6586'
          }
        },
        servico: 'Banho e Tosa',
        observacoes: 'Valor Final: R$ 120,00',
        valor: 120.00
      }
    ];

    // Em uma implementação real, você usaria a chamada abaixo:
    // const response = await api.get<Agendamento[]>('/agendamentos');
    // return response.data;
    
    // Retornando os dados mockados
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockAgendamentos), 500); // Simulando atraso de rede
    });
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    throw new Error('Não foi possível carregar os agendamentos. Tente novamente mais tarde.');
  }
};

export const atualizarStatusAgendamento = async (id: number, status: 'CONCLUIDO' | 'CANCELADO'): Promise<void> => {
  try {
    // Simulando uma chamada de API
    console.log(`Atualizando agendamento ${id} para status: ${status}`);
    
    // Em uma implementação real, você usaria a chamada abaixo:
    // await api.patch(`/agendamentos/${id}/status`, { status });
    
    // Simulando atraso de rede
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 300);
    });
  } catch (error) {
    console.error('Erro ao atualizar status do agendamento:', error);
    throw new Error('Não foi possível atualizar o status do agendamento. Tente novamente.');
  }
};
