import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  const Icon = type === 'success' ? CheckCircle : AlertCircle;
  const accent = type === 'success' ? 'border-brand text-brand-hi' : 'border-steel text-steel-light';

  return (
    <motion.div
      role="alert"
      aria-live="assertive"
      className={`fixed right-4 top-4 z-[100] flex max-w-[340px] items-start gap-3 rounded-[3px] border bg-charcoal px-4 py-3 shadow-2xl ${accent}`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <Icon className="mt-0.5 h-4 w-4 flex-none" />
      <p className="flex-1 text-sm text-paper">{message}</p>
      <button
        onClick={onClose}
        aria-label="Fechar notificação"
        className="flex-none text-steel hover:text-paper"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
