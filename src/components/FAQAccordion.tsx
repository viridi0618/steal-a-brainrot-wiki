'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            style={{ borderBottom: index < faqs.length - 1 ? '1px solid #2a2826' : 'none' }}
          >
            {/* Clickable header */}
            <h3>
              <button
                type="button"
                className="flex items-center justify-between w-full py-5 px-1 text-left transition-colors duration-200"
                style={{ color: '#f0ece4' }}
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
              >
                <span className="font-sans text-base font-medium pr-4">
                  {faq.question}
                </span>

                <ChevronDown
                  size={20}
                  className="flex-shrink-0 transition-transform duration-300 ease-in-out"
                  style={{
                    color: isOpen ? '#d4af6a' : '#8a8884',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
            </h3>

            {/* Expandable body */}
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: isOpen ? '600px' : '0',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <p
                className="pb-5 px-1 font-sans text-sm leading-relaxed"
                style={{ color: '#8a8884' }}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
