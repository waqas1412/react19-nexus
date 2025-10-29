/**
 * AppShell - Application shell for micro-frontends
 */

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="glass-card border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-2xl animate-float">
                ⚡
              </div>
              <div>
                <h1 className="text-xl font-bold text-neon">React 19 Nexus</h1>
                <p className="text-xs text-white/40">Micro-Frontend Architecture</p>
              </div>
            </div>

            <nav className="flex gap-2">
              <a
                href="https://github.com/waqas1412/react19-nexus"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 text-sm text-white/80 hover:text-white"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 py-8 text-center text-white/40 text-sm"
      >
        <p>
          Built with React 19.2.0 • Showcasing Actions, Suspense, useOptimistic
        </p>
        <p className="mt-2">
          <a
            href="https://github.com/waqas1412"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            @waqas1412
          </a>
        </p>
      </motion.footer>
    </div>
  );
}
