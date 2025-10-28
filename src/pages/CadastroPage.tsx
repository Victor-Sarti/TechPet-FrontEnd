import React, { useMemo, useState } from 'react';

type FormState = {
  // Tutor (Cliente)
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
  // Pet (Animal)
  petNome: string;
  especie: string;
  raca: string;
  idade: string; // manter como string para facilitar validação de input
};

type FormErrors = Partial<Record<keyof FormState, string>> & { geral?: string; sucesso?: string };

const initialState: FormState = {
  nome: '',
  email: '',
  telefone: '',
  senha: '',
  confirmarSenha: '',
  petNome: '',
  especie: '',
  raca: '',
  idade: '',
};

const CadastroPage: React.FC = () => {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const progresso = useMemo(() => {
    // progresso simples: 2 blocos (Tutor e Pet). 0, 50, 100
    const tutorOk = Boolean(values.nome && values.email && values.telefone && values.senha && values.confirmarSenha);
    const petOk = Boolean(values.petNome && values.especie && values.raca && values.idade);
    if (tutorOk && petOk) return 100;
    if (tutorOk || petOk) return 50;
    return 0;
  }, [values]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined, geral: undefined, sucesso: undefined }));
  };

  const validate = (): boolean => {
    const er: FormErrors = {};

    // Tutor validations
    if (!values.nome.trim()) er.nome = 'Informe seu nome.';
    else if (values.nome.length > 150) er.nome = 'Máx. 150 caracteres.';

    if (!values.email.trim()) er.email = 'Informe seu e-mail.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) er.email = 'E-mail inválido.';

    if (!values.telefone.trim()) er.telefone = 'Informe seu telefone.';

    if (!values.senha) er.senha = 'Informe uma senha.';
    else if (values.senha.length < 6) er.senha = 'Mínimo de 6 caracteres.';

    if (!values.confirmarSenha) er.confirmarSenha = 'Confirme sua senha.';
    else if (values.confirmarSenha !== values.senha) er.confirmarSenha = 'As senhas não coincidem.';

    // Pet validations
    if (!values.petNome.trim()) er.petNome = 'Informe o nome do pet.';
    if (!values.especie.trim()) er.especie = 'Informe a espécie.';
    if (!values.raca.trim()) er.raca = 'Informe a raça.';

    if (!values.idade.trim()) er.idade = 'Informe a idade.';
    else if (!/^\d+$/.test(values.idade)) er.idade = 'Apenas números.';

    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    setLoading(true);
    try {
      // Monte o payload conforme esperado pelo backend
      const payload = {
        cliente: {
          nome: values.nome.trim(),
          email: values.email.trim(),
          telefone: values.telefone.trim(),
        },
        senha: values.senha,
        animal: {
          nome: values.petNome.trim(),
          especie: values.especie.trim(),
          raca: values.raca.trim(),
          idade: Number(values.idade),
        },
      };

      // Simulação de chamada de API
      await new Promise((r) => setTimeout(r, 800));
      console.log('Cadastro payload', payload);

      setErrors({ sucesso: 'Cadastro realizado com sucesso! Você já pode realizar agendamentos.' });
      // Redirecionar após sucesso? Ex.: window.location.href = '/login';
    } catch (err) {
      setErrors({ geral: 'Não foi possível concluir o cadastro. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center">
          <a href="/" className="flex items-center gap-2 select-none">
            <div className="h-10 w-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
              <span className="text-teal-600 text-lg font-extrabold">T</span>
            </div>
            <span className="text-slate-900 text-2xl font-bold tracking-tight">TechPet</span>
          </a>
          <h1 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-slate-900">
            Crie sua conta e o primeiro pet
          </h1>
          <p className="mt-2 text-slate-600 text-sm text-center max-w-lg">
            Preencha seus dados e os do seu pet para começar a agendar no Vivi Pet Shop Móvel.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-teal-600 transition-all"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-slate-600 flex items-center justify-between">
            <span>Seus Dados</span>
            <span>Dados do Pet</span>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
          {errors.geral && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              {errors.geral}
            </div>
          )}
          {errors.sucesso && (
            <div className="mb-4 rounded-lg border border-teal-200 bg-teal-50 px-4 py-2 text-sm text-teal-700">
              {errors.sucesso}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-8">
            {/* Tutor */}
            <section>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-teal-600 text-white text-sm font-bold grid place-items-center">1</div>
                <h2 className="text-lg font-semibold text-slate-900">Seus Dados</h2>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="nome" className="block text-sm font-medium text-slate-700">Nome</label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    maxLength={150}
                    value={values.nome}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border-slate-300 focus:border-teal-500 focus:ring-teal-500 text-slate-900"
                    placeholder="Seu nome completo"
                  />
                  {errors.nome && <p className="mt-1 text-xs text-red-600">{errors.nome}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">E-mail</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="mt-1 w-full rounded-xl border-slate-300 focus:border-teal-500 focus:ring-teal-500 text-slate-900"
                    placeholder="voce@email.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-slate-700">Telefone</label>
                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    required
                    value={values.telefone}
                    onChange={handleChange}
                    autoComplete="tel"
                    className="mt-1 w-full rounded-xl border-slate-300 focus:border-teal-500 focus:ring-teal-500 text-slate-900"
                    placeholder="(00) 90000-0000"
                  />
                  {errors.telefone && <p className="mt-1 text-xs text-red-600">{errors.telefone}</p>}
                </div>

                <div>
                  <label htmlFor="senha" className="block text-sm font-medium text-slate-700">Senha</label>
                  <input
                    id="senha"
                    name="senha"
                    type="password"
                    required
                    value={values.senha}
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={6}
                    className="mt-1 w-full rounded-xl border-slate-300 focus:border-teal-500 focus:ring-teal-500 text-slate-900"
                    placeholder="Crie uma senha"
                  />
                  {errors.senha && <p className="mt-1 text-xs text-red-600">{errors.senha}</p>}
                </div>

                <div>
                  <label htmlFor="confirmarSenha" className="block text-sm font-medium text-slate-700">Confirmar Senha</label>
                  <input
                    id="confirmarSenha"
                    name="confirmarSenha"
                    type="password"
                    required
                    value={values.confirmarSenha}
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={6}
                    className="mt-1 w-full rounded-xl border-slate-300 focus:border-teal-500 focus:ring-teal-500 text-slate-900"
                    placeholder="Repita a senha"
                  />
                  {errors.confirmarSenha && <p className="mt-1 text-xs text-red-600">{errors.confirmarSenha}</p>}
                </div>
              </div>
            </section>

            {/* Pet */}
            <section>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-teal-600 text-white text-sm font-bold grid place-items-center">2</div>
                <h2 className="text-lg font-semibold text-slate-900">Vamos cadastrar o seu primeiro Pet!</h2>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="petNome" className="block text-sm font-medium text-slate-700">Nome do Pet</label>
                  <input
                    id="petNome"
                    name="petNome"
                    type="text"
                    required
                    value={values.petNome}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border-slate-300 focus:border-teal-500 focus:ring-teal-500 text-slate-900"
                    placeholder="Ex.: Luna"
                  />
                  {errors.petNome && <p className="mt-1 text-xs text-red-600">{errors.petNome}</p>}
                </div>

                <div>
                  <label htmlFor="especie" className="block text-sm font-medium text-slate-700">Espécie</label>
                  <select
                    id="especie"
                    name="especie"
                    required
                    value={values.especie}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border-slate-300 focus:border-teal-500 focus:ring-teal-500 text-slate-900 bg-white"
                  >
                    <option value="" disabled>Selecione</option>
                    <option value="Cão">Cão</option>
                    <option value="Gato">Gato</option>
                    <option value="Ave">Ave</option>
                    <option value="Outro">Outro</option>
                  </select>
                  {errors.especie && <p className="mt-1 text-xs text-red-600">{errors.especie}</p>}
                </div>

                <div>
                  <label htmlFor="raca" className="block text-sm font-medium text-slate-700">Raça</label>
                  <input
                    id="raca"
                    name="raca"
                    type="text"
                    required
                    value={values.raca}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border-slate-300 focus:border-teal-500 focus:ring-teal-500 text-slate-900"
                    placeholder="Ex.: SRD, Poodle, Siamês"
                  />
                  {errors.raca && <p className="mt-1 text-xs text-red-600">{errors.raca}</p>}
                </div>

                <div>
                  <label htmlFor="idade" className="block text-sm font-medium text-slate-700">Idade</label>
                  <input
                    id="idade"
                    name="idade"
                    type="text"
                    inputMode="numeric"
                    required
                    value={values.idade}
                    onChange={(e) => {
                      // somente números
                      const next = e.target.value.replace(/[^\d]/g, '');
                      handleChange({ ...e, target: { ...e.target, name: 'idade', value: next } } as any);
                    }}
                    className="mt-1 w-full rounded-xl border-slate-300 focus:border-teal-500 focus:ring-teal-500 text-slate-900"
                    placeholder="Ex.: 3"
                  />
                  {errors.idade && <p className="mt-1 text-xs text-red-600">{errors.idade}</p>}
                </div>
              </div>
            </section>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center rounded-xl bg-teal-600 text-white font-semibold px-5 py-3 shadow-sm hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar e Começar a Agendar'}
              </button>
              <div className="text-center text-sm">
                <a href="/login" className="font-semibold text-teal-700 hover:text-teal-800">Já tem conta? Voltar para o Login.</a>
              </div>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">Ao continuar, você concorda com os Termos de Uso e a Política de Privacidade.</p>
      </div>
    </div>
  );
};

export default CadastroPage;
