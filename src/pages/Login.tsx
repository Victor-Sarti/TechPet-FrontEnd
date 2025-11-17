import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      await new Promise((r) => setTimeout(r, 600));
      console.log("Login payload", payload);
      // Integração com API vai aqui
      // Sucesso de login -> redireciona para o fluxo de agendamento
      navigate("/agendar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          <a href="/" className="flex items-center gap-2 select-none">
            <div className="h-10 w-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
              <span className="text-teal-600 text-lg font-extrabold">T</span>
            </div>
            <span className="text-slate-900 text-2xl font-bold tracking-tight">
              TechPet
            </span>
          </a>
          <h1 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-slate-900">
            Bem-vindo(a) ao TechPet!
          </h1>
          <p className="mt-2 text-slate-600 text-sm">Acesse sua conta para agendar.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-1 w-full rounded-xl border-slate-300 focus:border-teal-500 focus:ring-teal-500 text-slate-900"
                placeholder="voce@email.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Senha
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="mt-1 w-full rounded-xl border-slate-300 focus:border-teal-500 focus:ring-teal-500 text-slate-900"
                placeholder="Sua senha"
                minLength={6}
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-slate-700">
                  Li e concordo com o <span className="font-semibold text-teal-700">Termo de Uso e Privacidade</span>
                </label>
                <p className="text-slate-500 text-xs mt-1">
                  Seus dados serão usados apenas para cadastro e agendamento de serviços na TechPet, sem compartilhamento indevido com terceiros.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-xl bg-teal-600 text-white font-semibold px-5 py-3 shadow-sm hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Processando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-slate-700">
            <a
              href="/cadastro"
              className="font-semibold text-teal-700 hover:text-teal-800"
            >
              Novo por aqui? Clique para se cadastrar.
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Ao continuar, você concorda com os Termos de Uso e a Política de
          Privacidade.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

