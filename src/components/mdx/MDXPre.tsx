'use client';

import React, { useState } from 'react';

interface MDXPreProps {
  children?: React.ReactNode;
}

export const MDXPre: React.FC<MDXPreProps> = ({ children, ...props }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const codeElement = document.querySelector('pre code');
    if (codeElement) {
      navigator.clipboard.writeText(codeElement.textContent || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group my-6">
      <pre
        className="p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-x-auto"
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-2 py-1 text-xs bg-white/10 hover:bg-white/20 rounded text-blue-200 opacity-0 group-hover:opacity-100 transition-all"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};
