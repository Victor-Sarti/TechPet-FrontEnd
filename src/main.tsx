// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/Login'
import CadastroPage from './pages/CadastroPage'
import AgendarPage from './pages/AgendarPage'
import MeusAgendamentos from './pages/MeusAgendamentos'
import LoginFuncionario from './pages/LoginFuncionario'
import FuncionarioDashboard from './pages/FuncinarioDashboard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/agendar" element={<AgendarPage />} />
        <Route path="/agendamentos" element={<MeusAgendamentos />} />
        <Route path="/equipe/login" element={<LoginFuncionario />} />
        <Route path="/equipe/dashboard" element={<FuncionarioDashboard />} />
      </Routes>
    </BrowserRouter> 
  </StrictMode>,
);