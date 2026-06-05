import { useState, useEffect } from 'react';
import { 
  FileText, 
  BarChart, 
  Image as ImageIcon, 
  Search, 
  Users, 
  Calendar, 
  Rocket 
} from 'lucide-react';

const SECTIONS = [
  { id: 'resumo', label: 'Resumo', icon: FileText },
  { id: 'metricas', label: 'Métricas', icon: BarChart },
  { id: 'ativos', label: 'Ativos de Marca', icon: ImageIcon },
  { id: 'seo', label: 'SEO & GEO', icon: Search },
  { id: 'competidores', label: 'Competidores', icon: Users },
  { id: 'timeline', label: 'Timeline', icon: Calendar },
  { id: 'propostas', label: 'Propostas', icon: Rocket },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState('resumo');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: 0.1 }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100; // offset for sticky nav
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed left-6 xl:left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-1.5 print:hidden backdrop-blur-3xl bg-white/60 p-2.5 rounded-[1.5rem] border border-white shadow-2xl shadow-slate-200/50">
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        const Icon = section.icon;
        return (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 group
              ${isActive ? 'bg-[#06A791] text-white shadow-lg shadow-teal-500/20' : 'text-slate-400 hover:bg-white hover:text-slate-800 hover:shadow-sm shadow-slate-100'}
            `}
            title={section.label}
          >
            <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-teal-600'}`} />
            <span className={`text-[10px] font-extrabold uppercase tracking-widest whitespace-nowrap overflow-hidden transition-all duration-300 ease-out-expo
              ${isActive ? 'w-[100px] sm:w-[120px] opacity-100 ml-1' : 'w-0 opacity-0 ml-0 group-hover:w-[100px] group-hover:opacity-100 group-hover:ml-1'} text-left`}
            >
              {section.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
