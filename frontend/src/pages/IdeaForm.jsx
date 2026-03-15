import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Users, Globe } from 'lucide-react';
import { analyzeIdea } from '../services/api';

export default function IdeaForm() {
  const navigate = useNavigate();
  const [idea, setIdea] = useState('');
  const [targetUsers, setTargetUsers] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!idea.trim() || !targetUsers.trim() || !country.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const data = await analyzeIdea(idea, targetUsers, country);
      navigate('/results', {
        state: {
          idea,
          targetUsers,
          country,
          analysis: data.analysis,
          date: new Date().toISOString(),
        },
      });
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <div className="glass-card p-8 md:p-12 relative overflow-hidden">
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neonBlue to-transparent" />

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold mb-3">
              Analyze Your <span className="text-neonBlue">Startup</span>
            </h1>
            <p className="text-white/40 font-dmSans">
              Tell us about your idea and let AI evaluate its potential
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-4 mb-6 border border-red-500/30 bg-red-500/5"
            >
              <p className="text-red-400 text-sm font-dmSans">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Startup Idea */}
            <div>
              <label className="flex items-center gap-2 text-sm text-white/60 font-dmSans mb-2">
                <Rocket className="w-4 h-4 text-neonBlue" />
                Startup Idea
              </label>
              <textarea
                className="neon-input resize-none"
                style={{ minHeight: '120px' }}
                placeholder="Describe your startup idea in detail..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
              />
            </div>

            {/* Target Users */}
            <div>
              <label className="flex items-center gap-2 text-sm text-white/60 font-dmSans mb-2">
                <Users className="w-4 h-4 text-neonPurple" />
                Target Users
              </label>
              <input
                type="text"
                className="neon-input"
                placeholder="Who are your target customers?"
                value={targetUsers}
                onChange={(e) => setTargetUsers(e.target.value)}
              />
            </div>

            {/* Country */}
            <div>
              <label className="flex items-center gap-2 text-sm text-white/60 font-dmSans mb-2">
                <Globe className="w-4 h-4 text-neonPink" />
                Country / Market
              </label>
              <input
                type="text"
                className="neon-input"
                placeholder="Which country are you targeting?"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-neon w-full text-sm flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Analyzing...
                </>
              ) : (
                'Analyze Idea →'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
