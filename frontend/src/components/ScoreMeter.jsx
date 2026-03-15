import React from 'react';
import { motion } from 'framer-motion';

export default function ScoreMeter({ score = 0 }) {
  const radius = 80;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score > 70) return '#22C55E';
    if (score >= 40) return '#EAB308';
    return '#EF4444';
  };

  const getLabel = () => {
    if (score > 70) return 'High potential';
    if (score >= 40) return 'Moderate potential';
    return 'Needs improvement';
  };

  const color = getColor();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: radius * 2 + strokeWidth * 2, height: radius * 2 + strokeWidth * 2 }}>
        <svg
          width={radius * 2 + strokeWidth * 2}
          height={radius * 2 + strokeWidth * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={strokeWidth}
          />

          {/* Animated progress circle */}
          <motion.circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            style={{
              filter: `drop-shadow(0 0 10px ${color}80)`,
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="font-orbitron text-4xl font-bold"
            style={{ color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {score}
          </motion.span>
          <span className="text-white/40 text-xs font-dmSans">/ 100</span>
        </div>
      </div>

      <div className="text-center">
        <p className="font-orbitron text-sm font-bold tracking-wider text-white/80">
          Startup Success Score
        </p>
        <p className="text-xs mt-1 font-dmSans" style={{ color }}>
          {getLabel()}
        </p>
      </div>
    </div>
  );
}
