// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/Login'
import CadastroPage from './pages/CadastroPage'
import AgendarPage from './pages/AgendarPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/agendar" element={<AgendarPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);