import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Trash2, Eye, X, Rocket, TrendingUp, FileText, Users, Shield,
  Zap, DollarSign, AlertTriangle, Map, Code
} from 'lucide-react';
import { getReports, deleteReport, clearReports } from '../utils/localStorage';
import ScoreMeter from '../components/ScoreMeter';

const sectionConfig = [
  { key: 'summary', title: 'Summary', icon: FileText, color: '#00D4FF' },
  { key: 'marketDemand', title: 'Market Demand', icon: TrendingUp, color: '#A855F7' },
  { key: 'targetCustomers', title: 'Target Customers', icon: Users, color: '#FF006E' },
  { key: 'competitorAnalysis', title: 'Competitor Analysis', icon: Shield, color: '#00D4FF' },
  { key: 'uniqueValueProposition', title: 'Unique Value Proposition', icon: Zap, color: '#A855F7' },
  { key: 'monetizationStrategy', title: 'Monetization Strategy', icon: DollarSign, color: '#FF006E' },
  { key: 'risksAndChallenges', title: 'Risks & Challenges', icon: AlertTriangle, color: '#F97316' },
  { key: 'mvpRoadmap', title: 'MVP Roadmap', icon: Map, color: '#00D4FF' },
  { key: 'suggestedTechStack', title: 'Suggested Tech Stack', icon: Code, color: '#A855F7' },
];

function getScoreColor(score) {
  if (score > 70) return '#22C55E';
  if (score >= 40) return '#EAB308';
  return '#EF4444';
}

export default function History() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    setReports(getReports());
  }, []);

  const handleDelete = (id) => {
    deleteReport(id);
    setReports(getReports());
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all reports?')) {
      clearReports();
      setReports([]);
    }
  };

  // Empty state
  if (reports.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-24 h-24 rounded-full bg-neonBlue/5 border border-neonBlue/20 flex items-center justify-center">
            <Rocket className="w-10 h-10 text-neonBlue/40" />
          </div>
          <h2 className="font-orbitron text-2xl font-bold text-white/80">No Reports Yet</h2>
          <p className="text-white/40 font-dmSans max-w-md">
            Start by analyzing your first startup idea. Your reports will appear here for future reference.
          </p>
          <Link to="/analyze">
            <button className="btn-neon text-sm">Analyze Your First Idea →</button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <h1 className="font-orbitron text-2xl md:text-3xl font-bold">Previous Reports</h1>
            <span className="px-3 py-1 rounded-full text-xs font-orbitron font-bold bg-neonBlue/10 text-neonBlue border border-neonBlue/20">
              {reports.length}
            </span>
          </div>
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 text-sm text-red-400/60 hover:text-red-400 transition-colors font-dmSans"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </motion.div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-6 flex flex-col justify-between relative group"
            >
              {/* Delete button */}
              <button
                onClick={() => handleDelete(report.id)}
                className="absolute top-4 right-4 text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                title="Delete report"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div>
                <h3 className="font-orbitron text-sm font-bold text-white/90 mb-2 pr-8">
                  {report.idea?.length > 60 ? report.idea.substring(0, 60) + '...' : report.idea}
                </h3>
                <div className="flex items-center gap-3 text-xs text-white/30 font-dmSans mb-4">
                  <span>{new Date(report.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{report.country}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-orbitron font-bold"
                  style={{
                    color: getScoreColor(report.analysis?.successScore || 0),
                    background: `${getScoreColor(report.analysis?.successScore || 0)}15`,
                    border: `1px solid ${getScoreColor(report.analysis?.successScore || 0)}30`,
                  }}
                >
                  Score: {report.analysis?.successScore || 0}
                </span>
                <button
                  onClick={() => setSelectedReport(report)}
                  className="flex items-center gap-1.5 text-xs text-neonBlue hover:text-white transition-colors font-dmSans font-medium"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Report
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 overflow-y-auto pb-10"
            style={{ background: 'rgba(5, 5, 16, 0.85)', backdropFilter: 'blur(10px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) setSelectedReport(null); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="glass-card p-8 w-full max-w-4xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedReport(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Header */}
              <h2 className="font-orbitron text-xl font-bold mb-1 pr-10">{selectedReport.idea}</h2>
              <p className="text-white/30 text-sm font-dmSans mb-6">
                {selectedReport.country} • {new Date(selectedReport.date).toLocaleDateString()}
              </p>

              {/* Score */}
              <div className="flex justify-center mb-8">
                <ScoreMeter score={selectedReport.analysis?.successScore || 0} />
              </div>

              {/* Sections */}
              <div className="space-y-6">
                {sectionConfig.map((section) => (
                  <div key={section.key}>
                    <div className="flex items-center gap-2 mb-2">
                      <section.icon className="w-4 h-4" style={{ color: section.color }} />
                      <h3 className="font-orbitron text-xs font-bold tracking-wider uppercase" style={{ color: section.color }}>
                        {section.title}
                      </h3>
                    </div>
                    <p className="text-white/60 text-sm font-dmSans leading-relaxed whitespace-pre-line pl-6">
                      {selectedReport.analysis?.[section.key] || 'N/A'}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
