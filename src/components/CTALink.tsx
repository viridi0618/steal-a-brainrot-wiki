'use client';

import React from 'react';
import Link from 'next/link';

interface CTALinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  external?: boolean;
  className?: string;
}

const CTALink: React.FC<CTALinkProps> = ({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
}) => {
  const baseClasses =
    'inline-block font-sans text-sm font-medium rounded-full px-8 py-3 transition-all duration-300 ease-in-out';

  const variantClasses = {
    primary: `
      text-[#05030c]
      hover:brightness-110 hover:shadow-lg
      active:scale-[0.98]
    `,
    secondary: `
      border
      text-[#d4af6a]
      hover:text-[#05030c] hover:bg-[#d4af6a]
      active:scale-[0.98]
    `,
  };

  const variantStyle = {
    primary: {
      backgroundColor: '#d4af6a',
    },
    secondary: {
      backgroundColor: 'transparent',
      borderColor: '#d4af6a',
    },
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
        style={variantStyle[variant]}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClasses} style={variantStyle[variant]}>
      {children}
    </Link>
  );
};

export default CTALink;
