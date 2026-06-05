import { useState, useEffect } from "react";
import { 
  Sparkles, Award, MapPin, Search, Calendar, ChevronRight, 
  HelpCircle, Printer, MessageCircle, AlertTriangle, Check, X,
  ExternalLink, ArrowDown, ShieldAlert, FileText, Info, Maximize, Minimize
} from "lucide-react";

import { INITIAL_SCORE_ITEMS } from "./data";
import MetricCard from "./components/MetricCard";
import ScoreSimulator from "./components/ScoreSimulator";
import CompetitorTable from "./components/CompetitorTable";
import TimelineBoard from "./components/TimelineBoard";
import PackageCard from "./components/PackageCard";
import FloatingNav from "./components/FloatingNav";
import Tooltip from "./components/Tooltip";

export default function App() {
  const [scoreItems] = useState(INITIAL_SCORE_ITEMS);
  const [printMode, setPrintMode] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("autoplay-print") === "true") {
      const timer = setTimeout(() => {
        window.print();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handlePrint = () => {
    const isIframe = window.self !== window.top;
    if (isIframe) {
      setShowPrintModal(true);
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-slate-800 font-sans antialiased selection:bg-teal-600 selection:text-white pb-12 print:bg-white print:pb-0">
      
      {/* Upper Navigation Rail */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200/60 z-40 px-4 py-3.5 print:hidden">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <span className="font-sans font-black text-sm tracking-widest text-[#193E39] uppercase">
              Orvalia Studio
            </span>
            <span className="text-slate-300 select-none text-xs">|</span>
            <div className="flex items-center gap-2 bg-gradient-to-r from-slate-50 to-white border border-slate-200/50 px-2.5 py-1 rounded-lg shadow-2xs">
              <img src="https://i.ibb.co/1fF3M1m6/elife-simbolo.png" alt="Símbolo Elife" className="w-5.5 h-5.5 object-contain select-none" referrerPolicy="no-referrer" />
              <div className="w-px h-3.5 bg-slate-200" />
              <img src="https://i.ibb.co/xSHy6LzN/elife-logo.png" alt="Elife Fitness" className="h-3.5 object-contain select-none brightness-95" referrerPolicy="no-referrer" />
            </div>
            <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 hidden sm:inline-block">
              Diagnóstico
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsFocusMode(!isFocusMode)}
              className={`text-[10px] sm:text-xs font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs ${isFocusMode ? 'bg-[#06A791] text-white border-transparent' : 'bg-slate-50 text-[#193E39] border border-slate-200 hover:bg-slate-100'}`}
              title="Modo Foco: leitura limpa e simplificada para texto"
            >
              {isFocusMode ? <Minimize className="w-3.5 sm:w-4 h-3.5 sm:h-4" /> : <Maximize className="w-3.5 sm:w-4 h-3.5 sm:h-4" />}
              <span className="hidden sm:inline">{isFocusMode ? 'Desativar Foco' : 'Modo Foco'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="text-[10px] sm:text-xs font-extrabold text-[#193E39] bg-teal-50 border border-teal-150 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl hover:bg-teal-100 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <FileText className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-teal-600" />
              <span className="hidden sm:inline">Gerar PDF</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Cover Zone */}
      <header className="bg-gradient-to-br from-[#091513] via-[#0F2823] to-[#184039] text-white py-20 md:py-32 px-6 lg:px-16 xl:px-24 relative overflow-hidden print:bg-slate-900 print:text-white print:py-16">
        {/* Subtle decorative glows */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#06A791]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#DF5CBD]/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Abstract geometric lines */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50 pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">
          
          {/* Left Column: Strong Agency Typography & Content */}
          <div className="md:col-span-8 flex flex-col items-start space-y-10">
            
            {/* Top Eyebrow */}
            <div className="inline-flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] backdrop-blur-md px-4 py-2 rounded-full text-[10px] text-teal-300 font-bold uppercase tracking-[0.2em] shadow-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <Sparkles className="w-4 h-4 text-[#DF5CBD] fill-[#DF5CBD]" /> Dossiê Estratégico Exclusivo
            </div>

            {/* Main Branding Header Container */}
            <div className="space-y-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h1 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.05] text-white">
                Diagnóstico de <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#06E1C4]">
                  Posicionamento Digital
                </span>
              </h1>
              <p className="text-slate-300/90 text-base sm:text-lg max-w-2xl leading-relaxed font-light">
                Análise aprofundada de autoridade de marca, indexação de mecanismos de busca locais e mapeamento de lacunas comerciais em Indaiatuba, SP.
              </p>
            </div>
            
            {/* Glossy Brand Identity Block */}
            <div className="flex flex-col sm:flex-row sm:items-center bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-8 rounded-[2rem] shadow-2xl border border-white/[0.08] w-full sm:w-auto relative group overflow-hidden opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full relative z-10">
                {/* Majestic Master Symbol */}
                <div className="bg-white/5 p-6 rounded-[1.5rem] border border-white/10 shadow-inner flex items-center justify-center transition-all group-hover:scale-105 group-hover:border-white/20 duration-500 w-full sm:w-auto shrink-0">
                  <img 
                    src="https://i.ibb.co/1fF3M1m6/elife-simbolo.png" 
                    alt="Símbolo Oficial Elife Fitness" 
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain select-none filter drop-shadow-2xl mx-auto brightness-200" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                
                <div className="w-16 h-px sm:w-px sm:h-24 bg-white/10 block sm:hidden rounded-full my-2" />
                <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden sm:block" />
                
                {/* Logotype Display */}
                <div className="flex flex-col justify-center text-center sm:text-left space-y-3 w-full sm:w-auto">
                  <span className="text-[10px] font-bold text-teal-400/80 tracking-[0.2em] uppercase block leading-tight">Entity Investigada</span>
                  <img 
                    src="https://i.ibb.co/xSHy6LzN/elife-logo.png" 
                    alt="Logotipo Oficial Elife Fitness" 
                    className="h-9 sm:h-11 w-auto max-w-[200px] sm:max-w-none object-contain select-none brightness-200 mx-auto sm:mx-0 drop-shadow-xl" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-medium text-slate-400 tracking-wider">Mapeamento Concluído</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions & Meta Grid */}
            <div className="w-full pt-4 space-y-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <button
                onClick={handlePrint}
                className="text-xs font-black text-[#0B1E1A] bg-gradient-to-r from-[#06E1C4] to-[#06A791] hover:from-[#08F5D6] hover:to-[#06C1A7] px-8 py-4 rounded-xl transition-all flex items-center gap-3 cursor-pointer shadow-xl shadow-[#06A791]/20 hover:shadow-2xl hover:shadow-[#06A791]/30 hover:-translate-y-0.5 duration-300 print:hidden"
              >
                <FileText className="w-4 h-4" /> Exportar Documento Oficial (PDF)
              </button>

              {/* Minimal Meta Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/[0.08] text-xs text-slate-400 font-medium">
                <div>
                  <span className="text-[9px] text-teal-500/80 uppercase tracking-widest block mb-1.5">Segmento</span>
                  <span className="text-white">Moda Fitness</span>
                </div>
                <div>
                  <span className="text-[9px] text-teal-500/80 uppercase tracking-widest block mb-1.5">Localização</span>
                  <span className="text-white">Indaiatuba, SP</span>
                </div>
                <div>
                  <span className="text-[9px] text-teal-500/80 uppercase tracking-widest block mb-1.5">Atuação</span>
                  <span className="text-white">Desde 2022</span>
                </div>
                <div>
                  <span className="text-[9px] text-teal-500/80 uppercase tracking-widest block mb-1.5">Data Auditoria</span>
                  <span className="text-white">Junho, 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Score Display */}
          <div className="md:col-span-4 flex justify-center md:items-start md:justify-end h-full pt-8 md:pt-0">
            <div className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] backdrop-blur-3xl p-8 rounded-[2.5rem] text-center w-full max-w-[280px] flex flex-col items-center justify-center gap-6 shadow-2xl relative overflow-hidden group opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#DF5CBD]/50 to-transparent" />
              
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block">
                  Autoridade Local
                </span>
                <span className="text-[9px] font-medium text-slate-500 tracking-wider">
                  Score de Presença
                </span>
              </div>
              
              <div className="flex items-start justify-center relative">
                <span className="font-sans font-black text-7xl sm:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tighter leading-none relative z-10">
                  3<span className="text-5xl sm:text-6xl text-slate-500">.2</span>
                </span>
                <div className="absolute blur-2xl bg-[#DF5CBD]/20 w-24 h-24 rounded-full z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>

              <div className="bg-[#DF5CBD]/10 border border-[#DF5CBD]/30 text-[#DF5CBD] font-bold text-xs py-2 px-4 rounded-full inline-block backdrop-blur-md shadow-lg shadow-[#DF5CBD]/10 tracking-wider">
                Risco de Invisibilidade
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Sub line color-gradient bar separator */}
      <div className="h-1.5 bg-gradient-to-r from-teal-500 via-emerald-600 to-pink-500" />

      {!isFocusMode && <FloatingNav />}

      {/* Main Body */}
      <main className={`mx-auto px-4 md:px-6 py-12 space-y-12 print:py-4 transition-all duration-700 ease-in-out ${isFocusMode ? 'max-w-3xl focus-mode' : 'max-w-5xl'}`}>

        {/* 01 — Executive summary */}
        <section id="resumo" className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-6 scroll-mt-24">
          <div className="border-b border-slate-100 pb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#06A791] block mb-1">
              01 — Resumo Executivo
            </span>
            <h2 className="font-sans font-extrabold text-2xl text-slate-800 tracking-tight">
              O que este diagnóstico estratégico revela
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className={`transition-all duration-500 ${isFocusMode ? 'md:col-span-12 space-y-6' : 'md:col-span-7 space-y-4'}`}>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                A marca <strong className="text-slate-800">Elife Fitness</strong> possui ativos visuais deslumbrantes. O <Tooltip content="Manual técnico que define regras visuais, paleta de cores e forma de uso da tipografia.">
                  <span className="cursor-help underline decoration-[#06A791]/30 underline-offset-4 font-bold text-[#193E39]">brandbook</span>
                </Tooltip> elaborado pela <span className="text-teal-700 font-semibold">GF Branding</span> definiu com maestria os elementos-chave: o <Tooltip content="Assinatura gráfica principal, desenvolvida de maneira única para a marca.">
                  <span className="cursor-help underline decoration-[#06A791]/30 underline-offset-4 font-bold text-[#193E39]">logotipo autoral</span>
                </Tooltip>, o ícone abstrato de borboleta (transformação) e a elegante paleta cinza-teal e rosa vibrante.
              </p>
              
              <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed p-4 bg-emerald-50 rounded-2xl border border-emerald-100/60">
                O diagnóstico central indica: <span className="text-[#193E39] font-bold">Essa infraestrutura existe apenas no ecossistema interno (Instagram).</span> Fora dele, a Elife é digitalmente invisível. Buscas por moda local no Google ou pesquisas orgânicas regionais não retornam nenhum resultado ou indicação sobre a marca.
              </p>

              <blockquote className="border-l-4 border-[#06A791] pl-4 text-xs italic text-slate-400">
                "O showroom tátil na academia é um tesouro, agora precisamos conectar as pontes técnicas para que novas compradoras de Indaiatuba a localizem organicamente."
              </blockquote>
            </div>

            <div className={`${isFocusMode ? 'hidden' : 'md:col-span-5 flex flex-col'} bg-slate-50 border border-slate-100 rounded-2xl p-5 lg:p-6 space-y-5`}>
              {/* Official Branding Asset Showcase */}
              <div className="bg-white border border-slate-150/80 rounded-xl p-4.5 space-y-3.5 shadow-sm">
                <span className="text-[10px] uppercase font-bold tracking-widest text-teal-800 block border-b border-slate-100 pb-1.5 flex items-center gap-1.5 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DF5CBD]" /> Ativos Visuais Homologados
                </span>
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="flex flex-col items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-teal-200/50 transition-all group">
                    <div className="bg-white p-2.5 rounded-lg border border-slate-150/40 shadow-2xs h-16 w-16 flex items-center justify-center transition-all group-hover:shadow-xs">
                      <img src="https://i.ibb.co/1fF3M1m6/elife-simbolo.png" alt="Símbolo Elife" className="h-10 w-10 object-contain group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest mt-2 px-1 block text-center">Símbolo Borboleta</span>
                  </div>
                  <div className="flex flex-col items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-teal-200/50 transition-all group">
                    <div className="bg-white p-2.5 rounded-lg border border-slate-150/40 shadow-2xs h-16 w-full flex items-center justify-center transition-all group-hover:shadow-xs">
                      <img src="https://i.ibb.co/xSHy6LzN/elife-logo.png" alt="Logotipo Elife" className="h-5.5 object-contain my-auto group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-widest mt-2 px-1 block text-center">Logotipo Principal</span>
                  </div>
                </div>
              </div>

              <h4 className="font-sans font-extrabold text-sm text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-4 h-4 text-teal-600" /> Principais Conclusões
              </h4>

              <div className="space-y-3 text-xs leading-relaxed text-slate-600 font-medium">
                <div className="flex gap-2 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span><strong>Identidade Visual Forte (7/10):</strong> Ativo de alto nível focado no público feminino de Indaiatuba.</span>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                  <span><strong>Presença de Busca Nula (0/10):</strong> Ausência do showroom no Google Maps e falta de sintonias de SEO Local.</span>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <span><strong>Prova Social Indireta (2/10):</strong> Sem depoimentos públicos no Google, limitando a credibilidade orgânica.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 01b — Score metrics block */}
        <section id="metricas" className="space-y-6 scroll-mt-24">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#06A791]">
                Métricas Detalhadas
              </span>
              <h3 className="font-sans font-extrabold text-xl text-slate-800 tracking-tight">
                Indicadores de Maturidade Digital
              </h3>
            </div>
            {!isFocusMode && (
              <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
                Clique em qualquer card para ver recomendações
              </span>
            )}
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${isFocusMode ? 'hidden' : ''}`}>
            {scoreItems.map((item, index) => (
              <MetricCard 
                key={index} 
                item={item} 
                id={`metric-indicator-${index}`} 
              />
            ))}
          </div>
        </section>

        {/* Score Simulator Component */}
        {!isFocusMode && (
          <section className="print:hidden">
            <ScoreSimulator />
          </section>
        )}

        {/* 02 — Identidade de marca */}
        <section id="ativos" className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-6 page-break-before scroll-mt-24">
          <div className="border-b border-slate-100 pb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#06A791] block mb-1">
              02 — Atuais Ativos e Atenção
            </span>
            <h2 className="font-sans font-extrabold text-2xl text-slate-800 tracking-tight">
              Análise dos Ativos de Branding
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prós */}
            <div className="bg-emerald-50/40 p-6 rounded-2xl border border-emerald-100 space-y-4">
              <h4 className="font-sans font-extrabold text-base text-emerald-800 flex items-center gap-1.5">
                <Check className="w-5 h-5 text-emerald-600" /> O que está Consolidado (Pontos Fortes)
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Brandbook de alta qualidade com paleta teal + magenta exuberante.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><Tooltip content="Ato de transmitir a mensagem da marca de forma narrativa, conectando-se emocionalmente com o público."><span className="cursor-help underline decoration-emerald-500/30 underline-offset-4 border-b border-dashed border-emerald-300">Storytelling</span></Tooltip> excelente com o ícone borboleta (evolução feminina).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Manifesto emocional bem escrito, ideal para inspirar lealdade.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Slogan "Activate Your Moves" expressa tom motivacional moderno.</span>
                </li>
              </ul>
            </div>

            {/* Contras */}
            <div className="bg-rose-50/40 p-6 rounded-2xl border border-rose-100 space-y-4">
              <h4 className="font-sans font-extrabold text-base text-rose-800 flex items-center gap-1.5">
                <ShieldAlert className="w-5 h-5 text-rose-600" /> Pontos de Atenção & Risco
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Logo puramente abstrato: requer associação com moda de treino na comunicação externa.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Falta de conexão local: o manifesto de marca não ancora as raízes em Indaiatuba.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>Falta de aplicação: o design impecável precisa transcender sacolas e Tags, atuando nas páginas digitais.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span><Tooltip content="O trajeto (ou caminho) desenhado para conduzir o visitante do desconhecimento até o momento da compra."><span className="cursor-help underline decoration-rose-500/30 underline-offset-4 border-b border-dashed border-rose-300">Funil de Vendas</span></Tooltip> que depende exclusivamente do Instagram Direct gera perdas de novos leads ocupados.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 03 — SEO & GEO search test */}
        <section id="seo" className="bg-slate-900 text-white rounded-3xl p-6 lg:p-8 space-y-6 relative overflow-hidden page-break-before scroll-mt-24">
          <div className="absolute right-0 top-0 w-32 h-32 bg-teal-500/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="border-b border-slate-800 pb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#06A791] block mb-1">
              03 — Mecanismos de Busca & GEO
            </span>
            <h2 className="font-sans font-extrabold text-2xl tracking-tight text-white">
              Simulador Diagnóstico de Buscas Reais
            </h2>
          </div>

          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Efetuamos testes reais fingindo ser consumidoras locais em busca de moda fitness em Indaiatuba. Conheça as barreiras e oportunidades identificadas:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium pt-2">
            
            <div className="bg-slate-950 p-4 rounded-xl space-y-2 border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Busca no Google convencional:</span>
              <p className="text-slate-200">"moda fitness Indaiatuba"</p>
              <span className="text-rose-500 font-extrabold block">❌ Elife Fitness Inexistente</span>
              <span className="text-slate-400 font-normal leading-normal block">Concorrentes como Lu Moda e Vivian Store aparecem nas primeiras páginas.</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl space-y-2 border border-slate-800">
              <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Busca por Voz / Meu Negócio:</span>
              <p className="text-slate-200">"roupas de academia Indaiatuba SP"</p>
              <span className="text-rose-500 font-extrabold block">❌ Não consta no Google Maps</span>
              <span className="text-slate-400 font-normal leading-normal block">Perda do fluxo direto de clientes que treinam nas proximidades do showroom.</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl space-y-2 border border-slate-800 col-span-1">
              <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">SEO e Mapeamento Orgânico:</span>
              <p className="text-slate-200">"Melhores marcas fitness em Indaiatuba"</p>
              <span className="text-rose-500 font-extrabold block">❌ Sem indexação própria</span>
              <span className="text-slate-400 font-normal leading-normal block">As buscas orgânicas de interesse não mostram o site oficial por falta de indexação e sitemap estruturado.</span>
            </div>

          </div>

          <div className="p-4 bg-teal-950/40 border border-[#06A791]/20 rounded-2xl flex gap-3.5 mt-2">
            <span className="text-2xl mt-1">💡</span>
            <div>
              <span className="font-bold text-teal-300 block text-sm">Oportunidade de Ouro: <Tooltip content="Conjunto de melhorias no código do site (velocidade, segurança, navegação mobile) para aparecer melhor no Google sem depender das redes sociais."><span className="cursor-help underline decoration-[#DF5CBD]/40 underline-offset-4 border-b-2 border-transparent">SEO Técnico e Local</span></Tooltip></span>
              <p className="text-slate-300 text-xs leading-relaxed mt-0.5">
                Nenhum concorrente de Indaiatuba utiliza ainda a combinação de <Tooltip content="Técnica para fazer o seu site aparecer mais rápido e melhor posicionado no topo do Google.">
                  <span className="cursor-help underline decoration-[#DF5CBD]/40 underline-offset-4 font-bold text-white">Indexação Avançada</span>
                </Tooltip> e <Tooltip content="Uso de etiquetas lidas por robôs do Google, indicando exatamente onde fica sua loja e o que vende.">
                  <span className="cursor-help underline decoration-[#DF5CBD]/40 underline-offset-4 font-bold text-white">Otimização Semântica (Schema.org LocalBusiness)</span>
                </Tooltip>. Acelerar de forma profissional este planejamento estruturado coloca a Elife na vanguarda dos buscadores locais de forma absoluta.
              </p>
            </div>
          </div>
        </section>

        {/* 04 — Competitors table component */}
        <section id="competidores" className="page-break-before scroll-mt-24">
          <CompetitorTable />
        </section>

        {/* 05 — Timeline actions component */}
        <section id="timeline" className="page-break-before scroll-mt-24">
          <TimelineBoard />
        </section>

        {/* 06 — Packages proposals component */}
        <section id="propostas" className="page-break-before scroll-mt-24">
          <PackageCard />
        </section>

      </main>

      {/* Corporate footer */}
      <footer className="border-t border-slate-200 bg-white py-12 px-6 text-center text-xs text-slate-400 space-y-4 print:bg-white print:text-black print:py-4">
        <div className="max-w-5xl mx-auto space-y-2">
          <p className="font-sans font-extrabold text-base text-[#193E39] select-none tracking-widest flex justify-center items-center gap-2">
            Orvalia Studio <span className="text-teal-600 font-bold text-xs tracking-normal">| +55 11 97895-9567</span>
          </p>
          <p className="font-medium">
            Diagnóstico preparado exclusivamente para Elife Fitness por Orvalia Studio, Indaiatuba SP.
          </p>
          <p className="text-[10px] text-slate-300">
            Todos os direitos reservados © 2025 - 2026 Orvalia Studio.
          </p>
        </div>
      </footer>

      {/* Print Assistant Iframe Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full border border-slate-100 shadow-2xl space-y-6 relative animate-in zoom-in duration-300">
            <button 
              onClick={() => setShowPrintModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mx-auto text-teal-600">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="font-sans font-extrabold text-xl text-slate-800">
                  Gerar PDF do Diagnóstico
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Como você está visualizando o app dentro do editor (iframe de desenvolvimento), o navegador bloqueia a visualização da tela de impressão direta.
                </p>
                <p className="text-slate-600 text-xs font-semibold leading-relaxed">
                  Uma nova aba independente se abrirá e irá disparar a impressão nativa automaticamente!
                </p>
              </div>
            </div>

            <div className="bg-[#F4F7F6] border border-slate-100 rounded-2xl p-4 text-left space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 block">
                Instruções de Salvamento (Paisagem):
              </span>
              <ul className="list-disc list-inside text-xs text-slate-600 space-y-1.5 font-medium">
                <li>A janela de impressão abrirá logo após carregar a nova aba.</li>
                <li>No campo "Layout", selecione obrigatoriamente <strong className="text-[#193E39]">Paisagem / Landscape</strong>.</li>
                <li>No campo "Destino" / "Printer", escolha <strong className="text-[#193E39]">Salvar como PDF</strong> / <strong className="text-[#193E39]">Save as PDF</strong>.</li>
                <li>Mantenha a opção <strong className="text-[#193E39]">Gráficos de segundo plano / Background graphics</strong> ativa para preservar todas as cores vibrantes completas!</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setShowPrintModal(false)}
                className="flex-1 border border-slate-200 text-slate-600 text-xs font-extrabold py-3.5 px-4 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
              >
                Voltar
              </button>
              <a
                href={`${window.location.origin}${window.location.pathname}?autoplay-print=true`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowPrintModal(false)}
                className="flex-1 bg-[#06A791] hover:bg-[#068472] text-white text-xs font-black py-3.5 px-4 rounded-xl text-center inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all active:translate-y-0.5"
              >
                Gerar PDF <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
