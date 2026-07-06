'use client';

import React from 'react';

interface SectionTitleProps {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  tag,
  title,
  subtitle,
  align = 'center',
}) => {
  return (
    <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
      {tag && (
        <span
          className="font-sans text-xs uppercase tracking-[0.2em] mb-3"
          style={{ color: '#d4af6a' }}
        >
          {tag}
        </span>
      )}

      <h2
        className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight"
        style={{ color: '#f0ece4', fontFamily: 'Georgia, serif' }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="font-sans text-base mt-3 max-w-2xl"
          style={{ color: '#8a8884', fontFamily: 'Inter, sans-serif' }}
        >
          {subtitle}
        </p>
      )}

      {/* Decorative gold underline */}
      <div
        className="mt-5 h-0.5 w-16 rounded-full"
        style={{
          backgroundColor: '#d4af6a',
          marginLeft: align === 'center' ? 'auto' : '0',
          marginRight: align === 'center' ? 'auto' : '0',
        }}
      />
    </div>
  );
};

export default SectionTitle;
