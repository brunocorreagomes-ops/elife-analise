import { useState, useRef, useEffect, ReactNode } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  icon?: boolean;
}

export default function Tooltip({ content, children, icon = false }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Position tooltip relative to viewport
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = () => {
    if (triggerRef.current && tooltipRef.current && isVisible) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      // Default to top positioning
      let top = triggerRect.top - tooltipRect.height - 8;
      let left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);

      // Check boundaries
      if (top < 10) {
        // Position on bottom if not enough space on top
        top = triggerRect.bottom + 8;
      }

      const maxLeft = window.innerWidth - tooltipRect.width - 10;
      if (left < 10) {
        left = 10;
      } else if (left > maxLeft) {
        left = maxLeft;
      }

      setPosition({ top, left });
    }
  };

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isVisible]);

  return (
    <>
      <span
        ref={triggerRef}
        className="inline-flex items-center gap-1 cursor-help group relative z-10 print:cursor-auto"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        {children}
        {icon && <Info className="w-3.5 h-3.5 text-teal-500/70 opacity-70 group-hover:opacity-100 transition-opacity" />}
      </span>

      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            top: `${position.top}px`,
            left: `${position.left}px`,
            zIndex: 9999,
          }}
          className="bg-slate-800 text-white text-xs p-2.5 rounded-lg shadow-xl border border-slate-700 w-max max-w-[250px] leading-relaxed animate-in fade-in zoom-in-95 pointer-events-none print:hidden flex flex-col gap-1"
        >
          <span className="font-bold text-teal-400 capitalize text-[10px] tracking-wider mb-0.5">Visão Estratégica</span>
          {content}
        </div>
      )}
    </>
  );
}
