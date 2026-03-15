import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText, TrendingUp, Users, Shield, Zap, DollarSign,
  AlertTriangle, Map, Code, ArrowLeft, Download, CheckCircle
} from 'lucide-react';
import {
  RadialBarChart, RadialBar, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  AreaChart, Area,
  PieChart, Pie, Cell
} from 'recharts';
import GlassCard from '../components/GlassCard';
import { saveReport } from '../utils/localStorage';
import { generatePDF } from '../utils/pdfGenerator';

// ─── Custom Tooltip ────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'rgba(15, 15, 40, 0.95)',
        border: '1px solid rgba(0, 212, 255, 0.3)',
        borderRadius: '8px',
        padding: '10px 14px',
        color: 'white',
        fontFamily: 'DM Sans',
      }}>
        {label && (
          <p style={{ color: '#00D4FF', marginBottom: 4, fontSize: 12 }}>{label}</p>
        )}
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color || '#ffffff', fontSize: 12, margin: '2px 0' }}>
            {entry.name}: {typeof entry.value === 'number' && String(entry.name).toLowerCase().includes('revenue')
              ? `$${Number(entry.value).toLocaleString()}`
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Data Helpers (all wrapped in try/catch) ───────────────────────────────────
function getRevenueData(score) {
  try {
    const safeScore = Number(score) || 50;
    const base   = safeScore > 70 ? 2000  : safeScore > 40 ? 500  : 100;
    const growth = safeScore > 70 ? 1.45  : safeScore > 40 ? 1.35 : 1.2;
    return Array.from({ length: 12 }, (_, i) => ({
      month: `Month ${i + 1}`,
      revenue: Math.round(base * Math.pow(growth, i) * (0.9 + Math.random() * 0.2)),
    }));
  } catch {
    return [];
  }
}

function getRadarData(score) {
  try {
    const safeScore = Number(score) || 50;
    const vals = safeScore > 70
      ? [85, 78, 72, 55, 90, 80]
      : safeScore > 40
      ? [60, 55, 58, 50, 65, 55]
      : [35, 30, 40, 35, 45, 35];
    const keys = ['Market Size', 'Growth Rate', 'Accessibility', 'Customer Need', 'Timing', 'Potential'];
    return keys.map((k, i) => ({ subject: k, value: vals[i], fullMark: 100 }));
  } catch {
    return [];
  }
}

function getCompetitorData(score) {
  try {
    const safeScore = Number(score) || 50;
    return [
      { name: 'Market Leader', strength: 82 },
      { name: 'Competitor A',  strength: 68 },
      { name: 'Competitor B',  strength: 61 },
      { name: 'Competitor C',  strength: 55 },
      { name: 'Your Startup',  strength: safeScore },
    ];
  } catch {
    return [];
  }
}

function getRiskData(score) {
  try {
    const safeScore = Number(score) || 50;
    const vals = safeScore > 70
      ? [15, 20, 15, 25, 25]
      : safeScore > 40
      ? [20, 25, 20, 20, 15]
      : [30, 25, 20, 15, 10];
    const names  = ['Technical', 'Market', 'Financial', 'Competitive', 'Execution'];
    const colors = ['#00D4FF', '#A855F7', '#FF006E', '#FFD700', '#00FF88'];
    return names.map((n, i) => ({ name: n, value: vals[i], fill: colors[i] }));
  } catch {
    return [];
  }
}

function getScoreColor(score) {
  if (score > 70) return '#00FF88';
  if (score >= 40) return '#FFD700';
  return '#FF4444';
}

// ─── Section config ────────────────────────────────────────────────────────────
const sectionConfig = [
  { key: 'summary',                title: 'Summary',                  icon: FileText,      color: '#00D4FF' },
  { key: 'marketDemand',           title: 'Market Demand',            icon: TrendingUp,    color: '#A855F7' },
  { key: 'targetCustomers',        title: 'Target Customers',         icon: Users,         color: '#FF006E' },
  { key: 'competitorAnalysis',     title: 'Competitor Analysis',      icon: Shield,        color: '#00D4FF' },
  { key: 'uniqueValueProposition', title: 'Unique Value Proposition', icon: Zap,           color: '#A855F7' },
  { key: 'monetizationStrategy',   title: 'Monetization Strategy',    icon: DollarSign,    color: '#FF006E' },
  { key: 'risksAndChallenges',     title: 'Risks & Challenges',       icon: AlertTriangle, color: '#F97316' },
  { key: 'mvpRoadmap',             title: 'MVP Roadmap',              icon: Map,           color: '#00D4FF' },
  { key: 'suggestedTechStack',     title: 'Suggested Tech Stack',     icon: Code,          color: '#A855F7' },
];

// ─── Shared chart card wrapper ─────────────────────────────────────────────────
function ChartCard({ title, accentColor = '#00D4FF', children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="glass-card p-6 relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />
      {title && (
        <h3
          className="font-orbitron text-xs font-bold tracking-wider uppercase mb-4"
          style={{ color: accentColor }}
        >
          {title}
        </h3>
      )}
      {children}
    </motion.div>
  );
}

// ─── Chart 1: Score Gauge ──────────────────────────────────────────────────────
function ScoreRadialChart({ score }) {
  const safeScore = isNaN(score) ? 50 : Math.min(100, Math.max(0, score));
  const color = getScoreColor(safeScore);
  const radialData = [{ name: 'Score', value: safeScore, fill: color }];

  return (
    <ChartCard accentColor={color} delay={0}>
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Gauge */}
        <div className="relative flex-shrink-0" style={{ width: 220, height: 220 }}>
          <ResponsiveContainer width={220} height={220}>
            <RadialBarChart
              cx="50%" cy="50%"
              innerRadius="55%" outerRadius="85%"
              startAngle={220} endAngle={-40}
              data={radialData}
              barSize={16}
            >
              <RadialBar
                background={{ fill: 'rgba(255,255,255,0.05)' }}
                dataKey="value"
                cornerRadius={8}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          {/* Centered text overlay */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
          >
            <span
              className="font-orbitron font-bold"
              style={{ fontSize: 48, color, lineHeight: 1 }}
            >
              {safeScore}
            </span>
            <span className="text-white/40 text-xs font-dmSans mt-1">/ 100</span>
          </div>
        </div>

        {/* Text summary */}
        <div className="flex-1 min-w-0">
          <p className="font-orbitron text-xl font-bold text-white mb-2">Startup Success Score</p>
          <p className="font-orbitron text-sm mb-4" style={{ color }}>
            {safeScore > 70 ? '🟢 High Potential' : safeScore >= 40 ? '🟡 Moderate Potential' : '🔴 Needs Improvement'}
          </p>
          <p className="text-white/50 font-dmSans text-sm leading-relaxed mb-5">
            {safeScore > 70
              ? 'Strong market potential detected. Favorable conditions for growth — consider moving forward with MVP development and early customer validation.'
              : safeScore >= 40
              ? 'Moderate potential with manageable risks. Strengthen your unique value proposition and address key market differentiators.'
              : 'Significant challenges identified. Consider pivoting your approach or refining the target market before proceeding.'}
          </p>

          {/* Progress bars */}
          {[
            { label: 'Market Fit',  val: Math.min(100, safeScore + 8) },
            { label: 'Feasibility', val: Math.max(20, safeScore - 5) },
            { label: 'Innovation',  val: Math.min(100, safeScore + 12) },
          ].map(({ label, val }) => (
            <div key={label} className="flex items-center gap-3 mb-2">
              <span className="text-white/40 text-xs font-dmSans w-20 flex-shrink-0">{label}</span>
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${color}, ${color}66)` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${val}%` }}
                  transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                />
              </div>
              <span className="text-white/40 text-xs font-dmSans w-8 text-right">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

// ─── Chart 2: Market Opportunity Radar ────────────────────────────────────────
function MarketRadarChart({ score }) {
  const data = getRadarData(score);
  return (
    <ChartCard title="Market Opportunity Radar" accentColor="#A855F7" delay={0.1}>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
          <PolarGrid stroke="#1E293B" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'DM Sans' }}
          />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#A855F7"
            fill="#A855F7"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ─── Chart 3: Competitor Landscape ────────────────────────────────────────────
function CompetitorBarChart({ score }) {
  const data = getCompetitorData(score);
  return (
    <ChartCard title="Competitive Landscape" accentColor="#00D4FF" delay={0.15}>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, bottom: 5, left: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'DM Sans' }}
            tickLine={false}
            axisLine={false}
            width={75}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="strength" name="Strength Score" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.name === 'Your Startup' ? '#00D4FF' : '#A855F7'}
                fillOpacity={entry.name === 'Your Startup' ? 1 : 0.6}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ─── Chart 4: Revenue Projection ──────────────────────────────────────────────
function RevenueAreaChart({ score }) {
  const data = getRevenueData(score);
  // Use a unique id per instance to avoid gradient conflicts
  const gradId = 'revGrad';

  return (
    <ChartCard title="12-Month Revenue Projection" accentColor="#FF006E" delay={0.2}>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 50 }}>
          {/* SVG defs for the gradient — these are native SVG, NOT recharts exports */}
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#FF006E" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#FF006E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#94A3B8', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            interval={2}
          />
          <YAxis
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="#FF006E"
            strokeWidth={2.5}
            fill={`url(#${gradId})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ─── Chart 5: MVP Timeline ────────────────────────────────────────────────────
function MVPTimeline() {
  const phases = [
    { label: 'Phase 1 — Foundation',    weeks: 4, offset: 0,  color: '#00D4FF' },
    { label: 'Phase 2 — Core Features', weeks: 6, offset: 4,  color: '#A855F7' },
    { label: 'Phase 3 — Launch',        weeks: 6, offset: 10, color: '#FF006E' },
  ];
  const totalWeeks = 16;

  return (
    <ChartCard title="MVP Development Timeline" accentColor="#00D4FF" delay={0.25}>
      <div className="space-y-4">
        {phases.map((phase, i) => (
          <div key={phase.label}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-dmSans font-medium" style={{ color: phase.color }}>
                {phase.label}
              </span>
              <span className="text-xs font-dmSans text-white/30">{phase.weeks} weeks</span>
            </div>
            <div
              className="h-8 rounded-lg relative"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <motion.div
                className="absolute top-0 h-full rounded-lg flex items-center px-3"
                style={{
                  left: `${(phase.offset / totalWeeks) * 100}%`,
                  width: `${(phase.weeks / totalWeeks) * 100}%`,
                  background: `linear-gradient(90deg, ${phase.color}CC, ${phase.color}44)`,
                  border: `1px solid ${phase.color}44`,
                  boxShadow: `0 0 10px ${phase.color}33`,
                }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: 'easeOut' }}
              >
                <span
                  className="font-orbitron font-bold text-white truncate"
                  style={{ fontSize: 9 }}
                >
                  {phase.label.split(' — ')[1]}
                </span>
              </motion.div>
            </div>
          </div>
        ))}

        {/* Week markers */}
        <div className="flex justify-between text-xs text-white/20 font-dmSans pt-1">
          {[1, 4, 8, 12, 16].map((w) => (
            <span key={w}>W{w}</span>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

// ─── Chart 6: Risk Donut ──────────────────────────────────────────────────────
function RiskDonutChart({ score }) {
  const data = getRiskData(score);

  return (
    <ChartCard title="Risk Distribution" accentColor="#F97316" delay={0.2}>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11, fontFamily: 'DM Sans', color: '#94A3B8' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ─── Main Results Page ─────────────────────────────────────────────────────────
export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [toast, setToast] = useState('');

  const state = location.state;

  // ── Guard: no state ──
  if (!state || !state.analysis) {
    return (
      <div style={{
        background: '#050510',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'white',
        fontFamily: 'DM Sans',
        gap: 16,
      }}>
        <h2 style={{ color: '#00D4FF', fontSize: 24, margin: 0 }}>No Analysis Data Found</h2>
        <p style={{ color: '#94A3B8', margin: 0 }}>Please submit a startup idea first.</p>
        <button
          onClick={() => navigate('/analyze')}
          style={{
            background: 'linear-gradient(135deg, #00D4FF, #A855F7)',
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            color: 'white',
            cursor: 'pointer',
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          Analyze an Idea →
        </button>
      </div>
    );
  }

  const { idea, country, analysis, date } = state;
  const score = isNaN(Number(analysis?.successScore)) ? 50 : Math.min(100, Math.max(0, Number(analysis.successScore)));

  // Auto-save on mount
  useEffect(() => {
    try {
      saveReport({
        idea,
        targetUsers: state.targetUsers,
        country,
        analysis,
        date: date || new Date().toISOString(),
      });
    } catch (e) {
      console.warn('Failed to save report:', e);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleDownloadPDF = () => {
    try {
      generatePDF(idea, country, analysis, date);
      showToast('PDF downloaded successfully!');
    } catch (e) {
      showToast('PDF generation failed.');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Top controls */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => navigate('/analyze')}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-dmSans text-sm flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h1 className="font-orbitron text-lg md:text-2xl font-bold truncate">
              {idea && idea.length > 60 ? idea.substring(0, 60) + '...' : idea}
            </h1>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-orbitron font-bold tracking-wide flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #FF006E, #A855F7)',
              boxShadow: '0 0 20px rgba(255,0,110,0.3)',
            }}
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </motion.div>

        {/* Section 1: Score Hero */}
        <ScoreRadialChart score={score} />

        {/* Section 2: Radar + Competitor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MarketRadarChart score={score} />
          <CompetitorBarChart score={score} />
        </div>

        {/* Section 3: Revenue + Risk */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevenueAreaChart score={score} />
          <RiskDonutChart score={score} />
        </div>

        {/* Section 4: MVP Timeline */}
        <MVPTimeline />

        {/* Section 5: Text Cards */}
        <div>
          <motion.p
            className="font-orbitron text-xs tracking-widest uppercase text-white/25 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Detailed Analysis
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sectionConfig.map((section, i) => (
              <GlassCard
                key={section.key}
                title={section.title}
                icon={section.icon}
                content={analysis[section.key] || ''}
                accentColor={section.color}
                delay={0.6 + i * 0.05}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Toast */}
      {toast && (
        <div className="toast toast-success flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-neonBlue" />
          <span className="text-white/80 text-sm font-dmSans">{toast}</span>
        </div>
      )}
    </div>
  );
}
