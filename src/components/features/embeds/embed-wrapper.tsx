'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EmbedWrapperProps {
  children: ReactNode;
  title?: string;
  compact?: boolean;
}

export function EmbedWrapper({ children, title, compact = false }: EmbedWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-retro-black/40 rounded-lg overflow-hidden border border-retro-purple/30 ${
        compact ? 'p-2' : 'p-4'
      }`}
    >
      {title && (
        <h4 className={`font-semibold text-retro-purple mb-2 ${compact ? 'text-xs' : 'text-sm'}`}>
          {title}
        </h4>
      )}
      <div className={compact ? '' : 'rounded-lg overflow-hidden'}>
        {children}
      </div>
    </motion.div>
  );
}
