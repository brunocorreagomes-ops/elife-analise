import { useState } from "react";
import { motion } from "motion/react";
import { CheckSquare, Square, TrendingUp, Sparkles, Award } from "lucide-react";

interface SimulationItem {
  id: string;
  label: string;
  points: number;
  phase: string;
  impact: string;
}

const SIMULATION_ITEMS: SimulationItem[] = [
  {
    id: "gmn",
    label: "Criar & Certificar Google Meu Negócio",
    points: 2.0,
    phase: "Fase 1",
    impact: "Criação de ponto geográfico no Maps.",
  },
  {
    id: "diretorios",
    label: "Cadastrar nos Diretórios Locais",
    points: 1.0,
    phase: "Fase 1",
    impact: "Presença em guias como localtreino.com.",
  },
  {
    id: "instagram",
    label: "Otimizar Bio do IG e Destaque 'Como Comprar'",
    points: 1.0,
    phase: "Fase 1",
    impact: "Encurta dores e jornada até o WhatsApp.",
  },
  {
    id: "site",
    label: "Lançar Site Oficial Responsivo",
    points: 1.5,
    phase: "Fase 2",
    impact: "Vitrine própria indexável 24h.",
  },
  {
    id: "schema",
    label: "Implementar Schema.org LocalBusiness",
    points: 1.5,
    phase: "Fase 2",
    impact: "Informa os buscadores tradicionais sobre contato em formato estruturado.",
  },
  {
    id: "suporte",
    label: "Configurar Página 'Como Visitar o Showroom'",
    points: 0.4,
    phase: "Fase 2",
    impact: "Criação de página de suporte rápido às clientes e indicações no showroom.",
  },
  {
    id: "artigos",
    label: "Publicar Artigos Locais no Blog (SEO Local)",
    points: 0.5,
    phase: "Fase 2 & 3",
    impact: "Responde dúvidas de interesse regional no Google Orgânico.",
  },
  {
    id: "parcerias",
    label: "Reels Focados + Ativações e Embaixadoras",
    points: 0.5,
    phase: "Fase 3",
    impact: "Aumenta prova social e indicação na comunidade local.",
  },
];

export default function ScoreSimulator() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const startingScore = 3.2;
  const simulatedAdditions = SIMULATION_ITEMS.reduce((sum, item) => {
    return checkedIds.includes(item.id) ? sum + item.points : sum;
  }, 0);

  const currentTotalScore = parseFloat((startingScore + simulatedAdditions).toFixed(1));

  // Determine label and color for simulated state
  const getSimulatedState = (score: number) => {
    if (score < 5) return { text: "Crítico / Invisível", color: "text-rose-500", bg: "bg-rose-50 border-rose-100", progressColor: "#f43f5e" };
    if (score < 7.5) return { text: "Crescimento / Intermediário", color: "text-amber-600", bg: "bg-amber-100 border-amber-200", progressColor: "#f59e0b" };
    return { text: "Autoridade Local Dominante", color: "text-teal-600", bg: "bg-teal-50 border-teal-100", progressColor: "#0d9488" };
  };

  const ratingState = getSimulatedState(currentTotalScore);

  // Math for SVG Dial Meter
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  // Progress max is 10, so percent is (currentTotalScore / 10) * 100
  const progressPercent = Math.min((currentTotalScore / 10) * 100, 100);
  const strokeOffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div id="simulador-score" className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4" /> Simulador Estratégico Elife
          </span>
          <h3 className="font-sans font-extrabold text-2xl text-slate-800 tracking-tight">
            Ative as Ações e veja o Score Subir
          </h3>
          <p className="text-slate-500 text-xs mt-1">
            Marque as tarefas recomendadas para calcular a evolução prevista de visibilidade.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCheckedIds(SIMULATION_ITEMS.map((i) => i.id))}
            className="text-xs text-teal-700 bg-teal-50 font-semibold px-3 py-1.5 rounded-xl border border-teal-100 hover:bg-teal-100 transition-colors"
          >
            Ativar Tudo
          </button>
          <button
            onClick={() => setCheckedIds([])}
            className="text-xs text-slate-500 bg-slate-50 font-semibold px-3 py-1.5 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors"
          >
            Limpar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Dial Meter Column */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-50/50 p-6 rounded-2xl border border-slate-100 relative overflow-hidden">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90">
              {/* Outer Background Circle */}
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-slate-100"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Inner Active Circle */}
              <motion.circle
                cx="72"
                cy="72"
                r={radius}
                stroke={ratingState.progressColor}
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset: strokeOffset }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>

            {/* Inner text */}
            <div className="absolute text-center flex flex-col items-center justify-center">
              <motion.span 
                key={currentTotalScore}
                initial={{ scale: 0.85, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-sans font-extrabold text-5xl text-slate-800 tracking-tight leading-none mb-0.5"
              >
                {currentTotalScore}
              </motion.span>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                SCORE GERAL
              </span>
            </div>
          </div>

          <div className="text-center mt-5 space-y-1 z-10">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Status Estimado
            </span>
            <div className={`text-sm font-extrabold transition-all duration-300 md:text-base ${ratingState.color}`}>
              {ratingState.text}
            </div>
          </div>

          {/* Slogan details */}
          <div className="mt-4 flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-xs text-[11px] font-semibold text-slate-600">
            <TrendingUp className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
            Evolução de +{(simulatedAdditions).toFixed(1)} pontos
          </div>
        </div>

        {/* Checklist selection */}
        <div className="lg:col-span-7 space-y-3">
          {SIMULATION_ITEMS.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => handleToggle(item.id)}
                className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 select-none ${
                  isChecked
                    ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
                id={`sim-toggle-${item.id}`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-teal-400 flex-shrink-0 fill-slate-900" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 flex-shrink-0" />
                  )}
                </div>

                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-medium text-sm leading-snug">
                      {item.label}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isChecked
                          ? "bg-slate-800 text-teal-300"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {item.phase}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] leading-relaxed transition-colors duration-200 ${
                      isChecked ? "text-slate-300" : "text-slate-400"
                    }`}
                  >
                    {item.impact}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span
                    className={`font-semibold text-xs py-0.5 px-1.5 rounded-md ${
                      isChecked ? "bg-teal-950 text-teal-300" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    +{item.points.toFixed(1)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {checkedIds.length === SIMULATION_ITEMS.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex gap-3.5 text-emerald-800"
        >
          <Award className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-bold block">Meta de Excelência Alcançada!</span>
            Implementando todas as fases do plano, a Elife Fitness alcançará o patamar de **9.6/10**, tornando-se a marca de destaque de moda fitness na região, consolidada com a mais robusta presença digital orgânica e comercial de Indaiatuba.
          </div>
        </motion.div>
      )}
    </div>
  );
}
