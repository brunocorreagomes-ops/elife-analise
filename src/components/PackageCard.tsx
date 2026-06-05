import { Check, Phone, ChevronRight, Star } from "lucide-react";
import { PROPOSAL_PACKAGES } from "../data";

export default function PackageCard() {
  const activePlan = PROPOSAL_PACKAGES[0]; // "Parceria Orvalia" is the only package now

  const getWhatsAppLinkForPromo = () => {
    const phone = "5511978959567"; 
    const text = `Olá Orvalia Studio! Gostaria de fechar o *Plano Parceria Orvalia* para a Elife Fitness (R$ 800 em até 4x). Vamos marcar para alinhar o setup digital completo e o mês de postagens?`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="vagas-propostas" className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-8">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <span className="text-xs font-bold uppercase tracking-widest text-[#06A791] block mb-1">
          04 — Parceria Estratégica Orvalia Studio
        </span>
        <h3 className="font-sans font-extrabold text-2xl text-slate-800 tracking-tight">
          Sua Presença Digital Consolidada
        </h3>
        <p className="text-slate-500 text-sm">
          Como estamos ativamente angariando clientes de destaque na cidade de Indaiatuba para consolidar nosso portfólio regional, oferecemos nosso escopo premium sob uma condição de parceria de alta performance.
        </p>
      </div>

      {/* Main Single Plan Showcase */}
      <div className="bg-gradient-to-br from-[#193E39] to-slate-900 text-white rounded-2xl p-6 lg:p-8 border border-emerald-950 shadow-md relative overflow-hidden">
        {/* Subtle decorative layout blobs */}
        <div className="absolute right-[-20px] top-[-20px] w-48 h-48 bg-[#06A791]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-[-20px] bottom-[-20px] w-36 h-36 bg-[#DF5CBD]/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row gap-8 items-stretch relative z-10">
          
          {/* Left info column: Plan Description & Features */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="bg-[#DF5CBD] text-white text-[9.5px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-white" /> Condição Exclusiva de Portfólio
                </span>
                <span className="bg-white/10 text-teal-300 border border-white/10 text-[9.5px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider font-sans">
                  Setup + Atividades
                </span>
              </div>

              <div>
                <h4 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight leading-none mb-2">
                  Plano Parceria Orvalia ✨
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                  {activePlan?.description}
                </p>
              </div>
            </div>

            {/* Deliverables details */}
            <div className="space-y-3.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#06A791] block">
                Entregas Inclusas na Parceria:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-100 font-medium">
                {activePlan?.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <Check className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-tight text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional statement footer */}
            <div className="border-t border-slate-100/10 pt-4 text-[11px] text-slate-400 leading-relaxed">
              Trabalhamos de forma transparente e estruturada, fornecendo suporte direto e sem cobranças adicionais ocultas. Todos os ativos, domínios e posts serão do controle exclusivo da Elife Fitness.
            </div>
          </div>

          {/* Right column: Action Pricing box */}
          <div className="lg:col-span-5 bg-slate-950/50 border border-white/10 rounded-xl p-6 flex flex-col justify-between space-y-6 lg:min-w-[300px]">
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                  Taxa Promocional Única de Setup
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-sans font-black text-5xl text-emerald-400 tracking-tight leading-none">
                    {activePlan?.price}
                  </span>
                  <span className="text-slate-400 text-xs font-bold font-sans">
                    / total
                  </span>
                </div>
                <span className="text-[10.5px] text-teal-300 font-semibold block mt-1.5 leading-snug">
                  Parcelado em até 4x de R$ 200 sem juros
                </span>
                <span className="text-[10px] text-slate-500 font-normal block mt-1">
                  Taxa simbólica para custeio de registro (.com.br) e licenças de design.
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 leading-relaxed font-medium">
                <div className="flex gap-2 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5" />
                  <span>Sem mensalidades ou contratos de fidelidade</span>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5" />
                  <span>Otimização Google Perfil de Empresa do zero</span>
                </div>
                <div className="flex gap-2 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5" />
                  <span>Registro de domínio .com.br incluso de graça</span>
                </div>
              </div>
            </div>

            <a
              href={getWhatsAppLinkForPromo()}
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-full bg-gradient-to-r from-[#DF5CBD] to-[#f46ece] hover:from-[#f46ece] hover:to-[#ff8fe1] text-white font-sans font-black text-sm py-4 px-6 rounded-xl inline-flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-xl shadow-pink-500/10 cursor-pointer duration-200 hover:-translate-y-0.5 group active:translate-y-0"
            >
              <Phone className="w-4 h-4 fill-white" />
              Ativar Presença Digital da Elife ✨
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
