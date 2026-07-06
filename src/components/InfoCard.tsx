'use client';

import React from 'react';
import Link from 'next/link';

interface InfoCardProps {
  icon?: string;
  tag?: string;
  title: string;
  description: string;
  href?: string;
  children?: React.ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  tag,
  title,
  description,
  href,
  children,
  className = '',
}) => {
  const baseClasses = `
    flex flex-col gap-4 p-6 rounded-lg
    transition-all duration-300 ease-in-out
    cursor-default
  `;

  const cardContent = (
    <>
      {/* Icon */}
      {icon && (
        <span className="text-4xl leading-none">{icon}</span>
      )}

      {/* Tag badge */}
      {tag && (
        <span
          className="inline-block self-start font-sans text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full"
          style={{
            backgroundColor: '#d4af6a',
            color: '#05030c',
          }}
        >
          {tag}
        </span>
      )}

      {/* Title */}
      <h3
        className="font-serif text-xl leading-snug"
        style={{ color: '#f0ece4', fontFamily: 'Georgia, serif' }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="font-sans text-sm leading-relaxed"
        style={{ color: '#8a8884', fontFamily: 'Inter, sans-serif' }}
      >
        {description}
      </p>

      {/* Optional children (e.g. extra actions, list items) */}
      {children}
    </>
  );

  const cardClasses = `${baseClasses} ${className}`.trim();

  if (href) {
    return (
      <Link
        href={href}
        className={cardClasses}
        style={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid #2a2826',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.borderColor = '#d4af6a';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
          e.currentTarget.style.borderColor = '#2a2826';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div
      className={cardClasses}
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid #2a2826',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.borderColor = '#d4af6a';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
        e.currentTarget.style.borderColor = '#2a2826';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {cardContent}
    </div>
  );
};

export default InfoCard;
