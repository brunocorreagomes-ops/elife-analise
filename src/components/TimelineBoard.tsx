import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Calendar, CheckSquare, Square, ThumbsUp, ArrowRight, Sparkles } from "lucide-react";
import { STRATEGIC_PHASES } from "../data";

export default function TimelineBoard() {
  const [activeTab, setActiveTab] = useState(1);
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});

  const activePhase = STRATEGIC_PHASES.find((p) => p.id === activeTab) || STRATEGIC_PHASES[0];

  const toggleAction = (phaseId: number, index: number) => {
    const key = `${phaseId}-${index}`;
    setCompletedActions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Calculate phase progress
  const getPhaseProgress = (phaseId: number) => {
    const phase = STRATEGIC_PHASES.find((p) => p.id === phaseId);
    if (!phase) return 0;
    
    const total = phase.actions.length;
    let checkedCount = 0;
    for (let i = 0; i < total; i++) {
      if (completedActions[`${phaseId}-${i}`]) {
        checkedCount++;
      }
    }
    return Math.round((checkedCount / total) * 100);
  };

  return (
    <div id="plano-acao" className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#06A791] block mb-1">
            05 — Plano de Implementação
          </span>
          <h3 className="font-sans font-extrabold text-2xl text-slate-800 tracking-tight">
            Cronograma Estratégico de 90 Dias
          </h3>
          <p className="text-slate-500 text-sm">
            Fases recomendadas para garantir indexação técnica correta e aumento do tráfego.
          </p>
        </div>

        {/* Phase Selectors */}
        <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 gap-1 overflow-x-auto self-start w-full sm:w-auto -mx-6 px-6 sm:mx-0 sm:px-0 hide-scrollbar">
          {STRATEGIC_PHASES.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={`text-xs font-semibold px-4 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 ${
                activeTab === p.id
                  ? "bg-[#193E39] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#193E39]"
              }`}
            >
              Mês {p.id}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive layout - screen only */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start print:hidden">
        {/* Phase details card */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#06A791]/10 text-[#06A791] font-sans font-extrabold text-lg">
              {activePhase.id}
            </span>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {activePhase.period}
              </span>
              <h4 className="font-sans font-extrabold text-[#193E39] text-lg leading-tight">
                {activePhase.title}
              </h4>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            {activePhase.description}
          </p>

          {/* Phase progress visualizer */}
          <div className="space-y-2 border-t border-slate-200/60 pt-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-semibold">Progresso Especial da Fase:</span>
              <span className="text-[#06A791] font-bold">{getPhaseProgress(activePhase.id)}%</span>
            </div>
            
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getPhaseProgress(activePhase.id)}%` }}
                transition={{ duration: 0.3 }}
                className="bg-[#06A791] h-full"
              />
            </div>
          </div>

          <div className="bg-[#193E39] text-white p-4 rounded-xl flex gap-3 text-xs leading-relaxed relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#06A791]/10 rounded-full blur-lg pointer-events-none" />
            <Sparkles className="w-4.5 h-4.5 text-[#06A791] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-slate-200">Recomendação Orvalia</span>
              {activePhase.id === 1 && "Foque em capturar avaliações no Google imediatamente para gerar Prova Social."}
              {activePhase.id === 2 && "O site institucional deve carregar rápido e conter Schema LocalBusiness."}
              {activePhase.id === 3 && "Use o tráfego conquistado para firmar embaixadas com educadores e academias locais."}
            </div>
          </div>
        </div>

        {/* Action checks */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block pb-1">
            Lista de Ações Práticas
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-2"
            >
              {activePhase.actions.map((action, idx) => {
                const isChecked = completedActions[`${activePhase.id}-${idx}`] || false;
                return (
                  <div
                    key={idx}
                    onClick={() => toggleAction(activePhase.id, idx)}
                    className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all duration-200 ${
                      isChecked
                        ? "bg-slate-50 border-slate-200 text-slate-400 font-normal line-through"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0 text-slate-400 group-hover:text-amber-500">
                      {isChecked ? (
                        <CheckSquare className="w-4.5 h-4.5 text-emerald-500" />
                      ) : (
                        <Square className="w-4.5 h-4.5" />
                      )}
                    </div>
                    <span className="text-xs sm:text-sm leading-relaxed">
                      {action}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {getPhaseProgress(activePhase.id) === 100 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold p-4 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-emerald-600" />
                <span>Excelente! Você simulou todas as metas desta fase.</span>
              </div>
              {activePhase.id < 3 && (
                <button
                  onClick={() => setActiveTab(activePhase.id + 1)}
                  className="flex items-center gap-1 text-xs text-[#193E39] hover:underline"
                >
                  Ir para próximo mês <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Print only - high fidelity landscape phases */}
      <div className="hidden print:block">
        <div className="grid grid-cols-3 gap-5">
          {STRATEGIC_PHASES.map((phase) => (
            <div key={phase.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#193E39] text-white font-sans font-black text-xs">
                    {phase.id}
                  </span>
                  <div>
                    <span className="text-[9px] text-[#06A791] font-bold uppercase tracking-wider block">
                      {phase.period}
                    </span>
                    <h4 className="font-sans font-extrabold text-[#193E39] text-xs leading-tight">
                      {phase.title}
                    </h4>
                  </div>
                </div>
                <p className="text-slate-600 text-[10px] leading-relaxed">
                  {phase.description}
                </p>
                <div className="space-y-1 pt-1">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                    Ações recomendadas:
                  </span>
                  <ul className="space-y-1 list-none pl-0">
                    {phase.actions.map((action, idx) => (
                      <li key={idx} className="flex gap-1.5 items-start text-slate-700 text-[10px] leading-snug">
                        <span className="text-emerald-600 text-xs font-bold">✓</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
