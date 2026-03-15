import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, FileDown, Clock } from 'lucide-react';
import GlassCard from '../components/GlassCard';

// ─── Framer Motion variants ────────────────────────────────────────────────────
const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ─── Feature cards ─────────────────────────────────────────────────────────────
const features = [
  {
    title: 'AI Analysis',
    icon: Sparkles,
    content: 'Get comprehensive startup analysis powered by advanced AI — market demand, competitors, risks, and a success score in seconds.',
    accentColor: '#00D4FF',
  },
  {
    title: 'PDF Export',
    icon: FileDown,
    content: 'Download beautifully formatted PDF reports of your analysis to share with co-founders, investors, or mentors.',
    accentColor: '#A855F7',
  },
  {
    title: 'History Tracking',
    icon: Clock,
    content: 'All your previous analyses are saved locally. Revisit, compare, and track the evolution of your startup ideas.',
    accentColor: '#FF006E',
  },
];

// ─── Pre-defined metric particles (static positions) ──────────────────────────
const PARTICLES = [
  { label: '$2.4M ARR',      top: 12, left: 5,  dur: 9,  delay: 0   },
  { label: '94% retention',  top: 25, left: 88, dur: 11, delay: 1.5 },
  { label: 'Series A',       top: 60, left: 8,  dur: 8,  delay: 3   },
  { label: '10x growth',     top: 75, left: 80, dur: 13, delay: 0.5 },
  { label: 'PMF achieved',   top: 40, left: 92, dur: 10, delay: 2   },
  { label: '50K users',      top: 85, left: 15, dur: 12, delay: 4   },
  { label: 'B2B SaaS',       top: 15, left: 75, dur: 9,  delay: 1   },
  { label: '$180 LTV',       top: 55, left: 3,  dur: 14, delay: 2.5 },
  { label: 'CAC $12',        top: 30, left: 50, dur: 11, delay: 5   },
  { label: 'NPS 72',         top: 70, left: 60, dur: 8,  delay: 0.8 },
  { label: 'MRR +34%',       top: 8,  left: 40, dur: 10, delay: 3.5 },
  { label: 'Seed Round',     top: 90, left: 45, dur: 12, delay: 1.2 },
  { label: '3x YoY',         top: 45, left: 25, dur: 9,  delay: 4.5 },
  { label: 'API-first',      top: 20, left: 60, dur: 11, delay: 6   },
  { label: 'Unit economics', top: 65, left: 35, dur: 13, delay: 2.8 },
  { label: 'PLG motion',     top: 35, left: 70, dur: 10, delay: 7   },
  { label: '$50M TAM',       top: 80, left: 72, dur: 9,  delay: 1.8 },
  { label: 'Go-to-market',   top: 50, left: 15, dur: 14, delay: 3.2 },
  { label: 'Burn rate',      top: 10, left: 22, dur: 11, delay: 5.5 },
  { label: 'Traction ↑',     top: 95, left: 88, dur: 8,  delay: 0.3 },
];

// ─── Landing Page ──────────────────────────────────────────────────────────────
export default function Landing() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* ── All keyframes injected directly in JSX so they are guaranteed present ── */}
      <style>{`
        @keyframes bgPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.85; }
        }
        @keyframes gridMove {
          0%   { background-position: 0px 0px; }
          100% { background-position: 60px 60px; }
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0px,   0px)  scale(1);   }
          50%       { transform: translate(40px, -50px) scale(1.1); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0px,   0px);  }
          50%       { transform: translate(-50px, 30px); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0px,   0px);  }
          33%       { transform: translate(30px, -40px); }
          66%       { transform: translate(-20px, 20px); }
        }
        @keyframes scanLine {
          0%   { top: -4px;   opacity: 0;   }
          3%   {              opacity: 1;   }
          97%  {              opacity: 0.8; }
          100% { top: 100vh;  opacity: 0;   }
        }
        @keyframes particleFloat {
          0%   { transform: translateY(0px);    opacity: 0;   }
          10%  {                                opacity: 1;   }
          90%  {                                opacity: 0.6; }
          100% { transform: translateY(-120px); opacity: 0;   }
        }
        @keyframes cornerPulse {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.9; }
        }
      `}</style>

      {/* ═══ OUTER CONTAINER ═══ */}
      <div style={{ minHeight: '100vh', width: '100%', background: '#030308', position: 'relative', overflow: 'hidden', paddingTop: '80px' }}>

        {/* ── Layer 1: Gradient base ── */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 80% 60% at 10% 40%,  rgba(0,212,255,0.18)  0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 90% 20%,  rgba(168,85,247,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 70% 40% at 50% 90%,  rgba(255,0,110,0.10)  0%, transparent 60%),
            radial-gradient(ellipse 100% 100% at 50% 50%, #0a0a1a 0%, #030308 100%)
          `,
          animation: 'bgPulse 6s ease-in-out infinite',
        }} />

        {/* ── Layer 2: Animated grid ── */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'gridMove 15s linear infinite',
        }} />

        {/* ── Layer 3: Glowing orbs ── */}
        <div style={{
          position: 'fixed', top: '-200px', left: '-200px',
          width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.20) 0%, rgba(0,212,255,0.05) 40%, transparent 70%)',
          filter: 'blur(40px)', zIndex: 2, pointerEvents: 'none',
          animation: 'orbFloat1 10s ease-in-out infinite',
        }} />
        <div style={{
          position: 'fixed', top: '20%', right: '-200px',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.22) 0%, rgba(168,85,247,0.06) 40%, transparent 70%)',
          filter: 'blur(50px)', zIndex: 2, pointerEvents: 'none',
          animation: 'orbFloat2 13s ease-in-out infinite',
        }} />
        <div style={{
          position: 'fixed', bottom: '-100px', left: '25%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,0,110,0.15) 0%, rgba(255,0,110,0.04) 40%, transparent 70%)',
          filter: 'blur(45px)', zIndex: 2, pointerEvents: 'none',
          animation: 'orbFloat3 16s ease-in-out infinite',
        }} />
        <div style={{
          position: 'fixed', top: '40%', left: '40%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,136,0.10) 0%, transparent 70%)',
          filter: 'blur(60px)', zIndex: 2, pointerEvents: 'none',
          animation: 'orbFloat1 18s ease-in-out infinite reverse',
        }} />

        {/* ── Layer 4: Floating metric particles ── */}
        {PARTICLES.map((p, i) => (
          <div key={i} style={{
            position: 'fixed',
            top: `${p.top}%`,
            left: `${p.left}%`,
            fontSize: '11px',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 500,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 3,
            color: i % 3 === 0
              ? 'rgba(0,212,255,0.35)'
              : i % 3 === 1
              ? 'rgba(168,85,247,0.30)'
              : 'rgba(0,255,136,0.25)',
            animation: `particleFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}>
            {p.label}
          </div>
        ))}

        {/* ── Layer 5: Scanning neon line ── */}
        <div style={{
          position: 'fixed', left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.6) 20%, rgba(168,85,247,0.9) 50%, rgba(0,212,255,0.6) 80%, transparent 100%)',
          boxShadow: '0 0 20px rgba(0,212,255,0.8), 0 0 40px rgba(168,85,247,0.4)',
          zIndex: 4, pointerEvents: 'none',
          animation: 'scanLine 6s linear infinite',
        }} />

        {/* ── Layer 6: HUD corner brackets ── */}
        {/* Top-left */}
        <div style={{ position: 'fixed', top: 20, left: 20, zIndex: 4, pointerEvents: 'none', animation: 'cornerPulse 3s ease-in-out infinite' }}>
          <div style={{ width: 28, height: 3, background: 'rgba(0,212,255,0.7)', borderRadius: 2 }} />
          <div style={{ width: 3, height: 28, background: 'rgba(0,212,255,0.7)', borderRadius: 2, marginTop: -3 }} />
        </div>
        {/* Top-right */}
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 4, pointerEvents: 'none', animation: 'cornerPulse 3s ease-in-out 0.75s infinite', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div style={{ width: 28, height: 3, background: 'rgba(0,212,255,0.7)', borderRadius: 2 }} />
          <div style={{ width: 3, height: 28, background: 'rgba(0,212,255,0.7)', borderRadius: 2, marginTop: -3 }} />
        </div>
        {/* Bottom-left */}
        <div style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 4, pointerEvents: 'none', animation: 'cornerPulse 3s ease-in-out 1.5s infinite', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ width: 3, height: 28, background: 'rgba(168,85,247,0.7)', borderRadius: 2 }} />
          <div style={{ width: 28, height: 3, background: 'rgba(168,85,247,0.7)', borderRadius: 2, marginTop: -3 }} />
        </div>
        {/* Bottom-right */}
        <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 4, pointerEvents: 'none', animation: 'cornerPulse 3s ease-in-out 2.25s infinite', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <div style={{ width: 3, height: 28, background: 'rgba(168,85,247,0.7)', borderRadius: 2 }} />
          <div style={{ width: 28, height: 3, background: 'rgba(168,85,247,0.7)', borderRadius: 2, marginTop: -3 }} />
        </div>

        {/* ═══════════════════════════════════════════════════════
            EXISTING CONTENT — untouched, raised above background
        ═══════════════════════════════════════════════════════ */}
        <div style={{ 
          position: 'relative', 
          zIndex: 10,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center'
        }}>

          {/* ── Hero ── */}
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              paddingTop: '60px',
              paddingBottom: '40px'
            }}
            className="px-6"
          >
            <motion.div
              className="text-center max-w-4xl"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              {/* Badge */}
              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-block px-4 py-2 rounded-full text-xs font-orbitron font-bold tracking-widest text-neonBlue border border-neonBlue/30 bg-neonBlue/5">
                  AI-POWERED ANALYSIS
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                variants={fadeUp}
                className="font-orbitron font-bold text-5xl md:text-7xl leading-tight mb-6"
              >
                Validate Your
                <br />
                <span className="gradient-text">Startup Idea</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-white/50 font-dmSans text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                Get instant AI-powered market analysis, competitor insights, and success
                scoring for your startup idea in seconds.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to="/analyze">
                  <button className="btn-neon animate-pulse-glow text-sm">
                    Start Analysis →
                  </button>
                </Link>
                <Link to="/history">
                  <button className="btn-ghost text-sm">
                    View History
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </section>

          {/* ── Feature Cards ── */}
          <section className="pb-20 px-6">
            <motion.div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '24px',
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '0 24px',
                alignItems: 'stretch'
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div key={feat.title} variants={fadeUp}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      padding: '28px',
                      height: '100%',
                      minHeight: '180px',
                      borderRadius: '16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(20px)',
                      boxSizing: 'border-box'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '16px'
                      }}>
                        <Icon className="w-6 h-6" style={{ color: feat.accentColor }} />
                        <h3 className="font-orbitron font-bold text-white tracking-widest text-sm m-0">
                          {feat.title}
                        </h3>
                      </div>
                      <p style={{
                        color: '#94A3B8',
                        fontSize: '14px',
                        lineHeight: '1.6',
                        margin: 0,
                        textAlign: 'left'
                      }}>
                        {feat.content}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>

        </div>
        {/* ── end content wrapper ── */}

      </div>
      {/* ── end outer wrapper ── */}
    </>
  );
}
