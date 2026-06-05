import { useState, useEffect } from "react";
import { 
  Sparkles, Award, MapPin, Search, Calendar, ChevronRight, 
  HelpCircle, Printer, MessageCircle, AlertTriangle, Check, X,
  ExternalLink, ArrowDown, ShieldAlert, FileText, Info
} from "lucide-react";

import { INITIAL_SCORE_ITEMS } from "./data";
import MetricCard from "./components/MetricCard";
import ScoreSimulator from "./components/ScoreSimulator";
import CompetitorTable from "./components/CompetitorTable";
import TimelineBoard from "./components/TimelineBoard";
import PackageCard from "./components/PackageCard";

export default function App() {
  const [scoreItems] = useState(INITIAL_SCORE_ITEMS);
  const [printMode, setPrintMode] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

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

          <div className="flex items-center gap-4">
            <button
              onClick={handlePrint}
              className="text-xs font-extrabold text-[#193E39] bg-teal-50 border border-teal-150 px-4 py-2 rounded-xl hover:bg-teal-100 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <FileText className="w-4 h-4 text-teal-600" /> Gerar PDF do Diagnóstico
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Cover Zone */}
      <header className="bg-[#193E39] text-white py-16 md:py-24 px-6 relative overflow-hidden print:bg-slate-900 print:text-white print:py-8">
        {/* Subtle circles */}
        <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-[#06A791]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-80px] left-[-80px] w-80 h-80 bg-[#DF5CBD]/800 rounded-full blur-3xl pointer-events-none opacity-10" />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="md:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#06A791]/20 border border-[#06A791]/30 px-3 py-1.5 rounded-full text-xs text-teal-300 font-semibold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> Relatório Estratégico Exclusivo
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-[#06A791] uppercase block">
                Presença Digital, SEO & Posicionamento
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white/95 p-4 rounded-2xl shadow-xl border border-white/10 w-fit max-w-full">
                <div className="flex items-center gap-3.5">
                  <div className="bg-gradient-to-br from-[#193E39]/5 to-transparent p-2.5 rounded-xl border border-slate-100 flex items-center justify-center shadow-2xs">
                    <img src="https://i.ibb.co/1fF3M1m6/elife-simbolo.png" alt="Símbolo Oficial Elife" className="w-10 h-10 object-contain select-none transition-transform hover:scale-105 duration-355" referrerPolicy="no-referrer" />
                  </div>
                  <div className="w-px h-10 bg-slate-250 hidden sm:block" />
                  <div className="flex flex-col justify-center">
                    <img src="https://i.ibb.co/xSHy6LzN/elife-logo.png" alt="Logotipo Oficial Elife" className="h-6.5 max-w-[140px] sm:max-w-none object-contain select-none brightness-95" referrerPolicy="no-referrer" />
                    <span className="text-[8.5px] font-bold text-slate-400 tracking-widest uppercase mt-1 block">Identidade Corporativa</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-300/80 text-sm max-w-lg leading-relaxed pt-1">
                Análise aprofundada de posicionamento, indexação de mecanismos de busca locais e mapeamento comercial em Indaiatuba, SP.
              </p>
            </div>

            {/* Interação com botões no Impresso para Download */}
            <div className="flex flex-wrap gap-3 pt-2 print:hidden pb-1">
              <button
                onClick={handlePrint}
                className="text-xs font-extrabold text-white bg-[#06A791] hover:bg-[#06E1C4]/10 hover:text-[#06E1C4] border border-[#06A791]/40 px-5 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm shadow-emerald-950/20 duration-150"
              >
                <FileText className="w-4 h-4 text-emerald-400" /> Gerar PDF do Diagnóstico Completo (A4)
              </button>
            </div>

            {/* MicroMetadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-700/60 pb-1 text-xs text-slate-300 font-medium">
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Segmento:</span>
                Moda Fitness Feminina
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Cidade base:</span>
                Indaiatuba, SP
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Existência:</span>
                Desde 2022
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-0.5">Relatório gerado:</span>
                Junho de 2025
              </div>
            </div>
          </div>

          {/* Score Circle Card */}
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="bg-slate-900/45 border border-slate-800 backdrop-blur-xs p-6 rounded-3xl text-center w-full max-w-[240px] space-y-3 shadow-md">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Score Digital Atual
              </span>
              
              <div className="flex items-baseline justify-center gap-1.5">
                <span className="font-sans font-extrabold text-7xl text-[#DF5CBD] tracking-tight leading-none">
                  3.2
                </span>
                <span className="text-slate-400 text-lg font-bold">/10</span>
              </div>

              <div className="bg-[#DF5CBD]/10 border border-[#DF5CBD]/20 text-[#DF5CBD] font-bold text-xs py-1.5 px-3 rounded-full inline-block">
                Invisibilidade Crítica
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Sub line color-gradient bar separator */}
      <div className="h-1.5 bg-gradient-to-r from-teal-500 via-emerald-600 to-pink-500" />

      {/* Main Body */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-12 space-y-12 print:py-4">

        {/* 01 — Executive summary */}
        <section className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#06A791] block mb-1">
              01 — Resumo Executivo
            </span>
            <h2 className="font-sans font-extrabold text-2xl text-slate-800 tracking-tight">
              O que este diagnóstico estratégico revela
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-4">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                A marca **Elife Fitness** possui ativos visuais deslumbrantes. O brandbook elaborado pela <span className="text-teal-700 font-semibold">GF Branding</span> definiu com maestria os elementos-chave: o logotipo autoral, o ícone abstrato de borboleta (transformação) e a elegante paleta cinza-teal e rosa vibrante.
              </p>
              
              <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed p-4 bg-emerald-50 rounded-2xl border border-emerald-100/60">
                O diagnóstico central indica: <span className="text-[#193E39] font-bold">Essa infraestrutura existe apenas no ecossistema interno (Instagram).</span> Fora dele, a Elife é digitalmente invisível. Buscas por moda local no Google ou pesquisas orgânicas regionais não retornam nenhum resultado ou indicação sobre a marca.
              </p>

              <blockquote className="border-l-4 border-[#06A791] pl-4 text-xs italic text-slate-400">
                "O showroom tátil na academia é um tesouro, agora precisamos conectar as pontes técnicas para que novas compradoras de Indaiatuba a localizem organicamente."
              </blockquote>
            </div>

            <div className="md:col-span-5 bg-slate-50 border border-slate-100 rounded-2xl p-5 lg:p-6 space-y-5">
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
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#06A791]">
                Métricas Detalhadas
              </span>
              <h3 className="font-sans font-extrabold text-xl text-slate-800 tracking-tight">
                Indicadores de Maturidade Digital
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
              Clique em qualquer card para ver recomendações
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <section className="print:hidden">
          <ScoreSimulator />
        </section>

        {/* 02 — Identidade de marca */}
        <section className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-6 page-break-before">
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
                  <span>Storytelling excelente com o ícone borboleta (evolução feminina).</span>
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
                  <span>Funil que depende exclusivamente do Instagram Direct gera perdas de novos leads ocupados.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 03 — SEO & GEO search test */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 lg:p-8 space-y-6 relative overflow-hidden page-break-before">
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
              <span className="font-bold text-teal-300 block text-sm">Oportunidade de Ouro: SEO Técnico e Local</span>
              <p className="text-slate-300 text-xs leading-relaxed mt-0.5">
                Nenhum concorrente de Indaiatuba utiliza ainda a combinação de **Indexação Avançada e Otimização Semântica (Schema.org LocalBusiness e Blog regional)**. Acelerar de forma profissional este planejamento estruturado coloca a Elife na vanguarda dos buscadores locais de forma absoluta.
              </p>
            </div>
          </div>
        </section>

        {/* 04 — Competitors table component */}
        <section className="page-break-before">
          <CompetitorTable />
        </section>

        {/* 05 — Timeline actions component */}
        <section className="page-break-before">
          <TimelineBoard />
        </section>

        {/* 06 — Packages proposals component */}
        <section className="page-break-before">
          <PackageCard />
        </section>

      </main>

      {/* Corporate footer */}
      <footer className="border-t border-slate-200 bg-white py-12 px-6 text-center text-xs text-slate-400 space-y-4 print:bg-white print:text-black print:py-4">
        <div className="max-w-5xl mx-auto space-y-2">
          <p className="font-sans font-extrabold text-base text-[#193E39] select-none tracking-widest">
            Orvalia Studio
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
