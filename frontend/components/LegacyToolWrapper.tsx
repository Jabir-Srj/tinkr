'use client';

import { ToolSidebar } from './ToolSidebar';
import Link from 'next/link';
import { Home } from 'lucide-react';

interface LegacyToolWrapperProps {
  children: React.ReactNode;
}

export function LegacyToolWrapper({ children }: LegacyToolWrapperProps) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex lg:pl-56" suppressHydrationWarning>
      {/* Sidebar */}
      <ToolSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Header with Home Button - Fixed to top, avoiding sidebar on desktop */}
        <header className="fixed top-0 right-0 left-0 lg:left-72 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-xl font-bold flex items-center gap-2">
              <span>📄</span>
              <span>Tool</span>
            </div>
            <Link
              href="/"
              className="p-2 rounded-lg border border-border bg-secondary-bg hover:bg-border text-foreground transition-colors flex items-center gap-2"
              title="Back to home"
            >
              <Home size={18} />
              <span className="text-sm font-medium hidden sm:inline">Home</span>
            </Link>
          </div>
        </header>

        {/* Content - Add LARGER top padding to account for fixed header */}
        <main className="flex-1 w-full pt-40 lg:pt-36">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-secondary-bg py-8 mt-12">
          <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
            <p>Made with ❤️ by <a href="https://github.com/Jabir-Srj/tinkr" className="text-accent hover:underline">Jabir</a></p>
            <p className="mt-1">Part of <a href="/" className="text-accent hover:underline">Tinkr</a> • Privacy-first tools</p>
          </div>
        </footer>
      </div>

      <style>{`
        /* Override hardcoded colors from legacy pages */
        .min-h-screen.bg-white { @apply bg-background !important; }
        .bg-white { @apply bg-background dark:bg-slate-900 !important; }
        .text-gray-900 { @apply text-foreground !important; }
        .text-gray-600 { @apply text-muted-foreground !important; }
        .text-gray-700 { @apply text-foreground !important; }
        .bg-gray-50 { @apply bg-secondary-bg !important; }
        .bg-gray-100 { @apply bg-secondary-bg dark:bg-slate-900 !important; }
        .bg-gray-200 { @apply bg-border !important; }
        .bg-gray-300 { @apply bg-border !important; }
        .border-gray-300 { @apply border-border !important; }
        .border-gray-400 { @apply border-border !important; }
        .focus\:ring-\[\#c96442\]:focus { @apply focus:ring-accent !important; }
        .focus\:border-transparent:focus { @apply focus:border-border !important; }
        .hover\:bg-\[\#b85535\]:hover { @apply hover:opacity-90 !important; }
        .hover\:bg-gray-300:hover { @apply hover:bg-border !important; }
        .text-gray-200 { @apply text-muted-foreground !important; }
        .text-blue-700 { @apply text-accent !important; }
        .bg-blue-100 { @apply bg-accent/10 !important; }
        .bg-blue-200 { @apply bg-accent/20 !important; }
        .hover\:bg-blue-200:hover { @apply hover:bg-accent/20 !important; }
        .text-green-700 { @apply text-accent !important; }
        .bg-green-100 { @apply bg-accent/10 !important; }
        .bg-green-200 { @apply bg-accent/20 !important; }
        .hover\:bg-green-200:hover { @apply hover:bg-accent/20 !important; }
        .text-red-600 { @apply text-red-500 !important; }
        .\[\#c96442\] { @apply accent !important; }
        
        /* Dark mode fixes for tool pages */
        .dark input,
        .dark textarea,
        .dark select {
          @apply bg-slate-800 text-slate-100 border-slate-600 !important;
        }
        .dark input::placeholder,
        .dark textarea::placeholder {
          @apply text-slate-400 !important;
        }
        .dark input:focus,
        .dark textarea:focus,
        .dark select:focus {
          @apply border-accent !important;
        }
      `}</style>
    </div>
  );
}
