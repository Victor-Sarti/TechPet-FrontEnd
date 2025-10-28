import React from 'react';
import pet from '../assets/petFeliz.png'

type NavProps = {
  onCtaClick?: () => void;
};

type SectionProps = {
  id?: string;
};

const Header: React.FC<NavProps> = ({ onCtaClick }) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
            <span className="text-teal-600 text-lg font-extrabold">T</span>
          </div>
          <span className="text-slate-800 text-xl font-bold tracking-tight">TechPet</span>
        </a>
        <nav className="flex items-center gap-6">
          <a href="#sobre" className="text-slate-700 hover:text-slate-900 text-sm font-medium">
            Sobre
          </a>
          <a href="#vantagens" className="text-slate-700 hover:text-slate-900 text-sm font-medium">
            Vantagens
          </a>
          <a
            href="/login"
            onClick={onCtaClick}
            className="inline-flex items-center rounded-full bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 shadow-sm hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 transition"
          >
            Acessar / Agendar
          </a>
        </nav>
      </div>
    </header>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 sm:pt-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 via-white to-white" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Agendamento Inteligente para o seu Pet Shop Móvel
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Tenha autonomia para agendar e gerenciar os serviços do seu pet com o Vivi Pet Shop Móvel.
              Simples, rápido e disponível quando você precisar.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-teal-600 text-white font-semibold px-6 py-3 shadow-sm hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 transition"
              >
                Fazer Login e Agendar
              </a>
              <a
                href="#vantagens"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 text-slate-800 font-semibold px-6 py-3 hover:bg-slate-50 transition"
              >
                Conheça as vantagens
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-teal-500" />
                Disponível 24/7
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                Gestão simples e prática
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -top-6 -left-6 bg-cyan-100/40 blur-2xl rounded-full -z-10" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <img
                src={pet}
                alt="Pet feliz recebendo cuidados"
                className="w-full h-72 sm:h-96 object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2">
                <div className="text-sm font-semibold text-teal-700">Autonomia</div>
                <div className="text-xs text-sky-800/80">Agende quando quiser</div>
              </div>
              <div className="rounded-xl border border-teal-200 bg-teal-50 px-3 py-2">
                <div className="text-sm font-semibold text-sky-700">Visibilidade</div>
                <div className="text-xs text-teal-800/80">Horários e serviços</div>
              </div>
              <div className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2">
                <div className="text-sm font-semibold text-cyan-700">Agilidade</div>
                <div className="text-xs text-sky-800/80">Comunicação rápida</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Sobre: React.FC<SectionProps> = ({ id = 'sobre' }) => {
  return (
    <section id={id} className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Sobre o TechPet</h2>
          <p className="mt-3 text-slate-600">
            Plataforma do Vivi Pet Shop Móvel para você agendar serviços, acompanhar disponibilidade e centralizar informações do seu pet em um só lugar.
          </p>
        </div>
      </div>
    </section>
  );
};

const Vantagens: React.FC<SectionProps> = ({ id = 'vantagens' }) => {
  const items = [
    {
      title: 'Autonomia 24/7',
      desc: 'Agende a qualquer momento, sem depender de horário comercial.',
      color: 'teal',
      iconBg: 'bg-teal-100',
      iconDot: 'bg-teal-500',
      border: 'border-teal-200',
    },
    {
      title: 'Informações Centralizadas',
      desc: 'Veja horários, serviços e disponibilidade em um único lugar.',
      color: 'sky',
      iconBg: 'bg-sky-100',
      iconDot: 'bg-sky-500',
      border: 'border-sky-200',
    },
    {
      title: 'Comunicação Rápida',
      desc: 'Confirmações e atualizações sem complicação.',
      color: 'cyan',
      iconBg: 'bg-cyan-100',
      iconDot: 'bg-cyan-500',
      border: 'border-cyan-200',
    },
  ] as const;

  return (
    <section id={id} className="py-12 sm:py-16 bg-gradient-to-b from-white to-sky-50/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <div
              key={it.title}
              className={`rounded-2xl border ${it.border} bg-white shadow-sm p-6`}
            >
              <div className="flex items-start gap-4">
                <div className={`h-10 w-10 rounded-xl ${it.iconBg} flex items-center justify-center`}>
                  <span className={`h-2.5 w-2.5 rounded-full ${it.iconDot}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{it.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-600">{it.desc}</p>
                </div>
              </div>
              <div className="mt-4">
                <a
                  href="/login"
                  className="text-sm font-semibold text-teal-700 hover:text-teal-800"
                >
                  Agendar agora →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-3 gap-6 items-start">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
                <span className="text-teal-600 text-sm font-extrabold">T</span>
              </div>
              <span className="text-slate-800 text-base font-bold">TechPet</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Vivi Pet Shop Móvel — agendamento e gestão de serviços para o seu pet com praticidade.
            </p>
          </div>
          <div className="space-y-1 text-sm">
            <div className="text-slate-900 font-semibold">Contato</div>
            <div className="text-slate-600">WhatsApp: (00) 90000-0000</div>
            <div className="text-slate-600">Email: contato@vivipetshopmovel.com</div>
            <div className="flex gap-3 pt-1">
              <a
                href="#"
                className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-teal-700 hover:border-teal-300 transition"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm5 3a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm0 2a3 3 0 1 1-.001 6.001A3 3 0 0 1 12 9zm5.5-2.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5z" />
                </svg>
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-teal-700 hover:border-teal-300 transition"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M13 22v-9h3l1-4h-4V7a1 1 0 0 1 1-1h3V2h-3a5 5 0 0 0-5 5v2H6v4h3v9h4z" />
                </svg>
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-teal-700 hover:border-teal-300 transition"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12.04 2a9.93 9.93 0 0 0-8.49 15.2L2 22l4.92-1.52A9.94 9.94 0 1 0 12.04 2zm5.9 15.84a7.94 7.94 0 0 1-4.58 2.29 7.98 7.98 0 0 1-6.83-2.27l-.49-.49-2.92.9.95-2.84-.51-.52a8 8 0 1 1 13.25 2.93z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} Vivi Pet Shop Móvel. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Sobre />
        <Vantagens />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;