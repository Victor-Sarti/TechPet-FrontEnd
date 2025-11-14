import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listAnimais } from "../services/animalService";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

type Animal = {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  dataNascimento: string;
  servicoDesejado?: string;
  observacoes?: string;
};

export default function FuncionarioDashboard() {
  const navigate = useNavigate();
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarAnimais = async () => {
      try {
        setLoading(true);
        const dados = await listAnimais();
        console.log("Dados retornados pela API:", dados); // Adicione esta linha

        setAnimais(dados);
      } catch (err) {
        console.error("Erro ao carregar animais:", err);
        setError(
          "Erro ao carregar a lista de animais. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    carregarAnimais();
  }, []);

 const formatarData = (dataString: string) => {
  // Se a data já estiver no formato DD/MM/YYYY, apenas retorne
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dataString)) {
    return dataString;
  }
  
  // Se não, tente formatar com date-fns
  try {
    return format(new Date(dataString), "dd/MM/yyyy", { locale: ptBR });
  } catch (e) {
    console.error('Erro ao formatar data:', e);
    return dataString; // Retorna o valor original em caso de erro
  }
}

  const calcularIdade = (dataNascimento: string) => {
  try {
    let [dia, mes, ano] = dataNascimento.split('/').map(Number);
    const hoje = new Date();
    const nascimento = new Date(ano, mes - 1, dia); // mês é 0-indexado no JS
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    
    // Ajusta se ainda não fez aniversário este ano
    if (mesAtual < (mes - 1) || (mesAtual === (mes - 1) && diaAtual < dia)) {
      idade--;
    }
    
    return idade;
  } catch (e) {
    console.error('Erro ao calcular idade:', e);
    return '?';
  }
}
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">
            Carregando animais cadastrados...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <div className="text-red-500 text-center">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium">Ocorreu um erro</h3>
            <p className="mt-1 text-sm text-slate-600">{error}</p>
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Pets Cadastrados
            </h1>
            <button
              onClick={() => navigate("/equipe/agendamentos")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ver Agendamentos
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {animais.length === 0 ? (
            <div className="text-center py-12">
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
                  d="M20 7l-8-4.5L4 7m16 0l-8 4.5M4 7v10l8 4.5m0-14.5v14.5m8-10v10l-8 4.5"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Nenhum pet cadastrado
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Ainda não há pets cadastrados no sistema.
              </p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {animais.map((animal) => (
                  <li key={animal.id} className="border-b border-gray-200">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {animal.nome} - {animal.especie} ({animal.raca})
                        </p>
                        {animal.dataNascimento && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {calcularIdade(animal.dataNascimento)} anos
                          </span>
                        )}
                      </div>

                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">
                            Data de Nascimento:
                          </span>{" "}
                          {formatarData(animal.dataNascimento)}
                        </p>
                      </div>

                      {animal.servicoDesejado && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">
                              Serviço desejado:
                            </span>{" "}
                            {animal.servicoDesejado}
                          </p>
                        </div>
                      )}

                      {animal.observacoes && (
                        <div className="mt-1">
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Observações:</span>{" "}
                            {animal.observacoes}
                          </p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
