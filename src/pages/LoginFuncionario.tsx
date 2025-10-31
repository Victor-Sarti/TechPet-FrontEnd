import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FuncionarioLoginPage() {
  const navigate = useNavigate()
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const payload = {
      telefone: telefone.trim(),
      senha,
    }

    try {
      // Aqui você deve chamar sua API de autenticação para funcionários (ex.: /api/funcionarios/login)
      // Exemplo: await axios.post('/api/funcionarios/login', payload)
      // Em caso de sucesso, navegar para o Dashboard do Funcionário

      console.log('Payload pronto para envio:', payload)

      // Simulação de sucesso (remova após integrar com o backend)
      await new Promise((r) => setTimeout(r, 600))
      navigate('/equipe/dashboard')
    } catch (err: unknown) {
      setError('Falha ao autenticar. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-slate-100">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Acesso da Equipe - TechPet</h1>
          <p className="mt-1 text-sm text-slate-500">Área exclusiva para colaboradores</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-slate-700">
              Telefone
            </label>
            <input
              id="telefone"
              name="telefone"
              type="tel"
              autoComplete="tel"
              required
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(11) 91234-5678"
              className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-slate-700">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar na Gestão'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="mailto:suporte@techpet.local"
            className="text-sm text-slate-500 hover:text-slate-700 underline underline-offset-2"
          >
            Problemas para acessar?
          </a>
        </div>
      </div>
    </div>
  )
}
