import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/analyze', label: 'Analyze' },
  { path: '/history', label: 'History' },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] glass-card border-b border-neonBlue/10"
      style={{ 
        borderRadius: 0, 
        borderTop: 'none', 
        borderLeft: 'none', 
        borderRight: 'none',
        width: '100%',
        padding: '0 24px'
      }}
    >
      <div className="max-w-7xl mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Rocket className="w-6 h-6 text-neonBlue group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-orbitron text-xl font-bold tracking-wider text-white">
            STARTUP<span className="text-neonBlue">.AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative font-dmSans text-sm tracking-wide uppercase transition-colors duration-300 py-1 ${
                location.pathname === link.path
                  ? 'text-neonBlue'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
              {/* Neon underline */}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-neonBlue transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0'
                }`}
                style={{ boxShadow: location.pathname === link.path ? '0 0 8px rgba(0,212,255,0.5)' : 'none' }}
              />
              {/* Hover underline */}
              <span className="absolute bottom-0 left-0 h-[2px] bg-neonBlue/50 w-0 group-hover:w-full transition-all duration-300 hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden pb-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`font-dmSans text-sm uppercase tracking-wide ${
                location.pathname === link.path ? 'text-neonBlue' : 'text-white/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
