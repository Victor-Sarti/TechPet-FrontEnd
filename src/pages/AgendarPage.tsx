import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AgendamentoWizard, { type AgendamentoPayload } from "../components/Agendamento";

const AgendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // Garantir que o modal abre ao entrar na rota
    setOpen(true);
  }, []);

  function handleClose() {
    setOpen(false);
    navigate("/");
  }

  function handleConfirmed(payload: AgendamentoPayload) {
    console.log("Agendamento pronto para enviar:", payload);
    // Aqui você pode integrar com o backend e, ao finalizar, redirecionar conforme a UX desejada
    setOpen(false);
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      <AgendamentoWizard
        isOpen={open}
        onClose={handleClose}
        onConfirmed={handleConfirmed}
      />
    </div>
  );
};

export default AgendarPage;
