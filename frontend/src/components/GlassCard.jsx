import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({
  title,
  icon: Icon,
  content,
  accentColor = '#00D4FF',
  children,
  className = '',
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${accentColor}22` }}
      className={`glass-card p-6 relative overflow-hidden ${className}`}
    >
      {/* Top accent border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          boxShadow: `0 0 20px ${accentColor}40`,
        }}
      />

      {/* Header */}
      {(title || Icon) && (
        <div className="flex items-center gap-3 mb-4">
          {Icon && (
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: `${accentColor}15` }}
            >
              <Icon className="w-5 h-5" style={{ color: accentColor }} />
            </div>
          )}
          {title && (
            <h3
              className="font-orbitron text-sm font-bold tracking-wider uppercase"
              style={{ color: accentColor }}
            >
              {title}
            </h3>
          )}
        </div>
      )}

      {/* Content */}
      {content && (
        <p className="text-white/70 font-dmSans text-sm leading-relaxed whitespace-pre-line">
          {content}
        </p>
      )}
      {children}
    </motion.div>
  );
}
