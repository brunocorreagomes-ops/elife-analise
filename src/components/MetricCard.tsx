import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { ScoreItem } from "../types";

interface MetricCardProps {
  item: ScoreItem;
  id: string;
  key?: any;
}

export default function MetricCard({ item, id }: MetricCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Helper colors and icons based on severity
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "forte":
        return {
          bg: "bg-emerald-50 border-emerald-100",
          text: "text-emerald-700",
          badge: "bg-emerald-100 text-emerald-800",
          icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
          barColor: "bg-emerald-500",
        };
      case "medio":
        return {
          bg: "bg-amber-50 border-amber-100",
          text: "text-amber-800",
          badge: "bg-amber-100 text-amber-800",
          icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
          barColor: "bg-amber-500",
        };
      case "fraco":
      case "critico":
      case "inexistente":
      case "invisivel":
      default:
        return {
          bg: "bg-rose-50 border-rose-100",
          text: "text-rose-700",
          badge: "bg-rose-100 text-rose-800",
          icon: <XCircle className="w-5 h-5 text-rose-600" />,
          barColor: "bg-rose-500",
        };
    }
  };

  const styles = getSeverityStyles(item.severity);

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`bg-white border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300 border-slate-200`}
    >
      <div 
        className="p-6 flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
        id={`${id}-trigger`}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="flex-shrink-0">
            {styles.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-sans font-semibold text-slate-800 text-base">
                {item.dimension}
              </h4>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${styles.badge}`}>
                {item.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {/* Score rating visual */}
          <div className="flex items-baseline gap-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <span className="font-sans font-bold text-2xl text-slate-800 leading-none">
              {item.score}
            </span>
            <span className="text-slate-400 text-xs font-semibold">/10</span>
          </div>

          <div className="text-slate-400">
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Progress line */}
      <div className="w-full bg-slate-100 h-1">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${item.score * 10}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${styles.barColor}`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`${id}-content`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="border-t border-slate-100 bg-slate-50/50"
          >
            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                  Diagnóstico Detalhado
                </span>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${styles.bg} flex gap-3`}>
                <Sparkles className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase block mb-1">
                    Solução Orvalia Studio
                  </span>
                  <p className="text-slate-700 text-sm font-medium leading-normal">
                    {item.recommendedAction}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
