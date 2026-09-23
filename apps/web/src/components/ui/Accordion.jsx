import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-brand-border/70 last:border-b-0 py-4 sm:py-5">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left group min-h-[44px]"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 group-hover:text-brand-gold-dark transition-colors pr-4 leading-snug">
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${isOpen ? 'bg-brand-gold text-white border-brand-gold rotate-180' : 'bg-brand-subtle border-brand-border text-slate-500 group-hover:border-brand-gold/60 group-hover:text-brand-gold-dark'}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 divide-y divide-brand-border/60 shadow-premium border border-brand-border">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? -1 : idx)}
        />
      ))}
    </div>
  );
}
