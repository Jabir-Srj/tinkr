'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useMemo } from 'react';
import { tools, categories } from '@/lib/tools';

export function ToolSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setExpandedCategories(new Set(categories.map(c => c.value).filter(c => c !== 'all')));
  }, []);

  useEffect(() => {
    if (!mounted || !scrollContainerRef.current) return;
    const activeEl = scrollContainerRef.current.querySelector('[data-active="true"]') as HTMLElement | null;
    if (activeEl) {
      const container = scrollContainerRef.current;
      const targetScroll = Math.max(0, activeEl.offsetTop - container.clientHeight / 2 + activeEl.offsetHeight / 2);
      container.scrollTop = targetScroll;
    }
  }, [pathname, mounted]);

  const currentPath = pathname.startsWith('/tools/') ? pathname : null;

  const organizedTools = useMemo(() => {
    let filtered = tools;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }
    const grouped: { [key: string]: typeof tools } = {};
    filtered.forEach(tool => {
      if (!grouped[tool.category]) grouped[tool.category] = [];
      grouped[tool.category].push(tool);
    });
    return grouped;
  }, [searchQuery]);

  const isToolsPage = pathname.startsWith('/tools/');
  if (!mounted) return null;

  const toggleCategory = (cat: string) => {
    const next = new Set(expandedCategories);
    if (next.has(cat)) next.delete(cat); else next.add(cat);
    setExpandedCategories(next);
  };

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border">
        {/* Logo */}
        <div className="px-3 py-2 border-b border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold hover:no-underline"
            style={{ color: 'var(--accent)' }}
            onClick={() => setIsOpen(false)}
          >
            <span style={{ color: 'var(--muted-foreground)' }}>~</span>
            <span>jabir@tinkr</span>
          </Link>
        </div>

        {/* Search */}
        {isToolsPage && (
          <div className="flex items-center border-b border-border" style={{ backgroundColor: 'var(--secondary-bg)' }}>
            <span className="px-2 text-xs border-r border-border py-1.5" style={{ color: 'var(--accent)' }}>❯</span>
            <input
              type="text"
              placeholder="filter..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent px-2 py-1.5 text-xs text-foreground focus:outline-none border-0"
              style={{ boxShadow: 'none' }}
            />
          </div>
        )}
      </div>

      {/* Tool tree */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden py-1"
      >
        {Object.keys(organizedTools).length > 0 ? (
          Object.entries(organizedTools).map(([cat, catTools]) => {
            const label = categories.find(c => c.value === cat)?.name ?? cat;
            const expanded = expandedCategories.has(cat);
            const isLastCat = Object.keys(organizedTools).indexOf(cat) === Object.keys(organizedTools).length - 1;

            return (
              <div key={cat}>
                {/* Category header */}
                <button
                  onClick={() => toggleCategory(cat)}
                  className="flex items-center gap-1 w-full px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors bg-transparent border-0 border-b-0"
                  style={{ borderBottom: 'none' }}
                >
                  <span className="text-xs shrink-0" style={{ color: 'var(--muted-foreground)' }}>
                            {expanded ? '▾' : '▸'}</span>
                  <span className="uppercase tracking-wider text-xs" style={{ color: 'var(--muted-foreground)' }}>{label}</span>
                </button>

                {/* Tools list */}
                {expanded && (
                  <div className="mb-1">
                    {catTools.map((tool, idx) => {
                      const isActive = currentPath === tool.url;
                      const isLast = idx === catTools.length - 1;
                      return (
                        <Link
                          key={idx}
                          href={tool.url}
                          data-active={isActive}
                          onClick={() => setIsOpen(false)}
                          title={tool.description}
                          className="flex items-center gap-2 px-2 py-0.5 text-xs transition-colors hover:no-underline"
                          style={isActive
                          ? { backgroundColor: 'var(--accent)', color: 'var(--background)' }
                          : { color: 'var(--muted-foreground)' }
                        }
                        onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
                        onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--muted-foreground)'; }}
                        >
                          <span className="shrink-0" style={{ color: isActive ? 'var(--background)' : 'var(--muted-foreground)' }}>
                            {isLast ? '└─' : '├─'}
                          </span>
                          <span className="shrink-0">{tool.emoji}</span>
                          <span className="truncate">{tool.name}</span>
                          {isActive && <span className="ml-auto shrink-0 text-background">◆</span>}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="px-3 py-4 text-xs text-muted-foreground">
            <div><span className="text-accent">{'>'}</span> no results</div>
          </div>
        )}
      </div>

      {/* Footer */}
      {isToolsPage && (
        <div className="flex-shrink-0 border-t border-border px-3 py-1.5">
          <p className="text-xs text-muted-foreground">
            {Object.values(organizedTools).flat().length}/{tools.length} tools
          </p>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      {isToolsPage && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-4 right-4 z-[60] px-3 py-2 border border-accent text-accent text-xs lg:hidden bg-background"
          aria-label="Toggle menu"
        >
          {isOpen ? '[close]' : '[menu]'}
        </button>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-56 border-r border-border bg-background z-40 flex flex-col hidden lg:flex overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {isOpen && isToolsPage && (
        <>
          <aside className="fixed left-0 top-0 h-screen w-56 border-r border-border bg-background z-40 flex flex-col lg:hidden overflow-hidden">
            <SidebarContent />
          </aside>
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </>
  );
}
