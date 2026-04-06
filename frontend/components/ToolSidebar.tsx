'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useMemo, useEffect, useRef } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { tools, categories } from '@/lib/tools';

export function ToolSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Expand all categories by default
    setExpandedCategories(new Set(categories.map(c => c.value).filter(c => c !== 'all')));
  }, []);

  // Save scroll position when it changes
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setScrollPosition(scrollTop);
  };

  // Scroll to active tool when pathname changes
  useEffect(() => {
    if (!mounted || !scrollContainerRef.current) return;

    // Find the active tool element and scroll it into view
    const activeElement = scrollContainerRef.current.querySelector('[data-active="true"]') as HTMLElement | null;
    if (activeElement) {
      // Scroll the container so the active element is visible
      const container = scrollContainerRef.current;
      const elementTop = activeElement.offsetTop;
      const elementHeight = activeElement.offsetHeight;
      const containerHeight = container.clientHeight;
      
      // Scroll to position the active element roughly in the middle
      const targetScroll = Math.max(0, elementTop - containerHeight / 2 + elementHeight / 2);
      container.scrollTop = targetScroll;
    }
  }, [pathname, mounted]);

  // Normalize path for comparison
  const currentPath = pathname.startsWith('/tools/') ? pathname : null;

  // Filter and organize tools by category
  const organizedTools = useMemo(() => {
    let filtered = tools;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query)
      );
    }

    // Group by category
    const grouped: { [key: string]: typeof tools } = {};
    filtered.forEach((tool) => {
      if (!grouped[tool.category]) {
        grouped[tool.category] = [];
      }
      grouped[tool.category].push(tool);
    });

    return grouped;
  }, [searchQuery]);

  const isToolsPage = pathname.startsWith('/tools/');

  if (!mounted) return null;

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <>
      {/* Mobile Menu Button - Only show on tool pages and on mobile - HIGHEST Z-INDEX */}
      {isToolsPage && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 right-6 z-[60] p-3 rounded-lg bg-accent text-white lg:hidden shadow-lg hover:opacity-90 transition"
          title="Toggle menu"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Desktop Sidebar - ALWAYS VISIBLE on desktop (lg+), NEVER affected by isOpen state */}
      <aside className="fixed left-0 top-0 h-screen w-56 bg-secondary-bg border-r border-border overflow-hidden z-40 transition-transform duration-300 flex flex-col hidden lg:flex">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 border-b border-border bg-secondary-bg w-full overflow-hidden">
          {/* Home Link */}
          <div className="p-4 w-full overflow-hidden">
            <Link
              href="/"
              className={`flex items-center gap-2 text-xl font-bold transition-all px-3 py-2 rounded-lg ${
                pathname === '/'
                  ? 'text-accent bg-accent/20 shadow-md'
                  : 'text-foreground hover:text-accent'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span>⚡</span>
              <span>tinkr</span>
            </Link>
          </div>

          {/* Search Bar - Compact by default, expands on focus */}
          {isToolsPage && (
            <div className="px-4 pb-2 w-full overflow-hidden">
              <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-2 py-1 focus-within:py-2 transition-all duration-200 w-full">
                <Search size={16} className="text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-background text-foreground placeholder-muted-foreground focus:outline-none text-sm min-w-0"
                />
              </div>
            </div>
          )}
        </div>

        {/* Tools List - Scrollable */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 space-y-2 w-full"
        >
          {Object.keys(organizedTools).length > 0 ? (
            Object.entries(organizedTools).map(([category, categoryTools]) => {
              const categoryLabel = categories.find(c => c.value === category)?.name || category;
              const isExpanded = expandedCategories.has(category);

              return (
                <div key={category}>
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="flex items-center gap-2 w-full px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                    />
                    <span>{categoryLabel}</span>
                  </button>

                  {/* Category Tools */}
                  {isExpanded && (
                    <div className="space-y-1 ml-2">
                      {categoryTools.map((tool, idx) => {
                        const isActive = currentPath === tool.url;
                        return (
                          <Link
                            key={idx}
                            href={tool.url}
                            data-active={isActive}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 group w-full min-w-0 ${
                              isActive
                                ? 'bg-accent text-white font-bold shadow-lg shadow-accent/50 ring-2 ring-accent/80'
                                : 'text-foreground hover:bg-border/50 hover:text-accent'
                            }`}
                            onClick={() => setIsOpen(false)}
                            title={tool.description}
                          >
                            <span className="text-base flex-shrink-0 group-hover:scale-110 transition-transform">
                              {tool.emoji}
                            </span>
                            <span className="truncate font-medium flex-1 min-w-0 text-xs">{tool.name}</span>
                            {isActive && (
                              <span className="ml-auto flex-shrink-0 text-white text-xs font-bold">●</span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-muted-foreground text-sm px-2 w-full">
              <p>No tools found</p>
              <p className="text-xs mt-1">Try different search terms</p>
            </div>
          )}
        </div>

        {/* Footer Info - Fixed at bottom */}
        {isToolsPage && (
          <div className="flex-shrink-0 border-t border-border p-2 bg-secondary-bg/50 w-full overflow-hidden">
            <p className="text-xs text-muted-foreground text-center">
              {Object.values(organizedTools).flat().length} of {tools.length} tools
            </p>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar - ONLY shows when hamburger is clicked on mobile */}
      {isOpen && isToolsPage && (
        <aside className="fixed left-0 top-0 h-screen w-56 bg-background/95 backdrop-blur-sm border-r border-border overflow-hidden z-40 transition-transform duration-300 flex flex-col lg:hidden translate-x-0">
          {/* Header - Fixed */}
          <div className="flex-shrink-0 border-b border-border bg-background/95 backdrop-blur-sm w-full overflow-hidden">
            {/* Home Link */}
            <div className="p-4 w-full overflow-hidden">
              <Link
                href="/"
                className={`flex items-center gap-2 text-xl font-bold transition-all px-3 py-2 rounded-lg ${
                  pathname === '/'
                    ? 'text-accent bg-accent/20 shadow-md'
                    : 'text-foreground hover:text-accent'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span>⚡</span>
                <span>tinkr</span>
              </Link>
            </div>

            {/* Search Bar - Compact by default, expands on focus */}
            {isToolsPage && (
              <div className="px-4 pb-2 w-full overflow-hidden">
                <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-2 py-1 focus-within:py-2 transition-all duration-200 w-full">
                  <Search size={16} className="text-muted-foreground flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-background text-foreground placeholder-muted-foreground focus:outline-none text-sm min-w-0"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Tools List - Scrollable */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 space-y-2 w-full">
            {Object.keys(organizedTools).length > 0 ? (
              Object.entries(organizedTools).map(([category, categoryTools]) => {
                const categoryLabel = categories.find(c => c.value === category)?.name || category;
                const isExpanded = expandedCategories.has(category);

                return (
                  <div key={category}>
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category)}
                      className="flex items-center gap-2 w-full px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                      />
                      <span>{categoryLabel}</span>
                    </button>

                    {/* Category Tools */}
                    {isExpanded && (
                      <div className="space-y-1 ml-2">
                        {categoryTools.map((tool, idx) => {
                          const isActive = currentPath === tool.url;
                          return (
                            <Link
                              key={idx}
                              href={tool.url}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 group w-full min-w-0 ${
                                isActive
                                  ? 'bg-accent text-white font-bold shadow-lg shadow-accent/50 ring-2 ring-accent/80'
                                  : 'text-foreground hover:bg-border/50 hover:text-accent'
                              }`}
                              onClick={() => setIsOpen(false)}
                              title={tool.description}
                            >
                              <span className="text-base flex-shrink-0 group-hover:scale-110 transition-transform">
                                {tool.emoji}
                              </span>
                              <span className="truncate font-medium flex-1 min-w-0 text-xs">{tool.name}</span>
                              {isActive && (
                                <span className="ml-auto flex-shrink-0 text-white text-xs font-bold">●</span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm px-2 w-full">
                <p>No tools found</p>
                <p className="text-xs mt-1">Try different search terms</p>
              </div>
            )}
          </div>

          {/* Footer Info - Fixed at bottom */}
          {isToolsPage && (
            <div className="flex-shrink-0 border-t border-border p-2 bg-background/95 backdrop-blur-sm w-full overflow-hidden">
              <p className="text-xs text-muted-foreground text-center">
                {Object.values(organizedTools).flat().length} of {tools.length} tools
              </p>
            </div>
          )}
        </aside>
      )}

      {/* Overlay for mobile - ONLY shows when menu is open, darker to help readability */}
      {isOpen && isToolsPage && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
