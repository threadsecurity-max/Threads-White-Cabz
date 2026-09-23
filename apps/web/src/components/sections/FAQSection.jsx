import React from 'react';
import { Accordion } from '../ui/Accordion';
import { FAQ_DATA } from '../../data/faqData';
import { Badge } from '../ui/Badge';
import { HelpCircle } from 'lucide-react';

export function FAQSection() {
  return (
    <section className="py-20 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14">
        <Badge variant="gold">
          <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
        </Badge>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">
          Everything You Need to Know
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Find fast answers regarding booking types, airport pickups, one-way trips, and fleet categories.
        </p>
      </div>

      <Accordion items={FAQ_DATA} />
    </section>
  );
}
