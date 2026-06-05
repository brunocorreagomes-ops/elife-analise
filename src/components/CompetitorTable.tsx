import { useState } from "react";
import { motion } from "motion/react";
import { Search, MapPin, Globe, Shield, RefreshCw, Smartphone, Check, X } from "lucide-react";
import { COMPETITORS_DATA } from "../data";
import { Competitor } from "../types";

export default function CompetitorTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(COMPETITORS_DATA[1]);

  const filteredCompetitors = COMPETITORS_DATA.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getThreatBadge = (threat: string) => {
    switch (threat) {
      case "Alta":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "Média":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Baixa":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Oportunidade":
      default:
        return "bg-purple-100 text-purple-800 border-purple-200 animate-pulse";
    }
  };

  return (
    <div id="analise-concorrencia" className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#06A791] block mb-1">
            04 — Análise Competitiva
          </span>
          <h3 className="font-sans font-extrabold text-2xl text-slate-800 tracking-tight">
            Mapeamento da Concorrência Local
          </h3>
          <p className="text-slate-500 text-sm">
            Investigamos como as principais lojas agem nos canais locais e onde estão as janelas comerciais livres.
          </p>
        </div>

        {/* Search input */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar concorrente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-medium pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#06A791] text-slate-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 print:grid-cols-12 gap-8">
        {/* Comparison Board on Left */}
        <div className="lg:col-span-4 print:col-span-4 bg-[#193E39] text-white p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#06A791]/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#06A791]">
              Visualizador Comparativo
            </span>
            
            {selectedCompetitor ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-sans font-extrabold text-lg tracking-tight">
                    Elife vs {selectedCompetitor.name}
                  </h4>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getThreatBadge(selectedCompetitor.threat)}`}>
                    Ameaça: {selectedCompetitor.threat}
                  </span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {selectedCompetitor.differential}
                </p>

                {/* Score indicators */}
                <div className="border-t border-slate-700/60 pt-4 space-y-2.5 text-xs text-slate-200">
                  <div className="flex justify-between items-center bg-emerald-950/20 px-2.5 py-1.5 rounded-lg">
                    <span className="text-slate-400 font-medium">Google Maps:</span>
                    <span className="font-semibold">{selectedCompetitor.gmn}</span>
                  </div>
                  <div className="flex justify-between items-center bg-emerald-950/20 px-2.5 py-1.5 rounded-lg">
                    <span className="text-slate-400 font-medium">Site Próprio:</span>
                    <span className="font-semibold">{selectedCompetitor.site}</span>
                  </div>
                  <div className="flex justify-between items-center bg-emerald-950/20 px-2.5 py-1.5 rounded-lg">
                    <span className="text-slate-400 font-medium">Seguidores IG:</span>
                    <span className="font-semibold">{selectedCompetitor.followers}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-xs">Selecione um competidor na tabela para comparar.</p>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-700/60 text-xs text-slate-300 space-y-1">
            <div className="font-semibold text-white">Diferencial Elife:</div>
            <div>Identidade visual robusta, brandbook impecável e Showroom diretamente integrado ao fluxo de treinos.</div>
          </div>
        </div>

        {/* Competitor Grid on Right */}
        <div className="lg:col-span-8 print:col-span-8 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3 pl-2">Rank</th>
                <th className="pb-3">Concorrente</th>
                <th className="pb-3">Site</th>
                <th className="pb-3">Google Meu Negócio</th>
                <th className="pb-3 text-right pr-2">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
              {filteredCompetitors.map((item, idx) => {
                const isElife = item.name.includes("Elife");
                const isSelected = selectedCompetitor?.name === item.name;

                return (
                  <tr
                    key={idx}
                    onClick={() => !isElife && setSelectedCompetitor(item)}
                    className={`group transition-all duration-150 cursor-pointer ${
                      isElife
                        ? "bg-[#06A791]/5 font-semibold text-[#193E39]"
                        : isSelected
                        ? "bg-slate-50"
                        : "hover:bg-slate-50/50"
                    }`}
                  >
                    <td className="py-3 px-2 text-slate-400 font-bold">{item.rank}</td>
                    <td className="py-3">
                      <div>
                        <span className={`font-semibold ${isElife ? "text-[#193E39] font-extrabold" : "text-slate-800"}`}>
                          {item.name}
                        </span>
                        {item.handle && (
                          <span className="block text-[11px] text-slate-400 font-normal">
                            {item.handle}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="flex items-center gap-1">
                        {item.site.startsWith("❌") || item.site === "Não" ? (
                          <X className="w-3.5 h-3.5 text-rose-500" />
                        ) : (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        )}
                        <span className="hidden sm:inline">{item.site.replace("✅", "").replace("❌", "")}</span>
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="flex items-center gap-1">
                        {item.gmn.startsWith("❌") || item.gmn === "Não" || item.gmn === "❌ Não possui" ? (
                          <X className="w-3.5 h-3.5 text-rose-500" />
                        ) : (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        )}
                        <span>{item.gmn.replace("✅", "").replace("❌", "").replace("Provável", "Disponível")}</span>
                      </span>
                    </td>
                    <td className="py-3 text-right pr-2">
                      {isElife ? (
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#06A791] bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">
                          Analizada
                        </span>
                      ) : (
                        <button
                          className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-lg transition-colors ${
                            isSelected
                              ? "bg-[#193E39] text-white"
                              : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                          }`}
                        >
                          {isSelected ? "Selecionada" : "Comparar"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredCompetitors.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs font-semibold">
              Nenhum concorrente localizado com este termo.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
