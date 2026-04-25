# Tinkr — Frontend

> Next.js 16 app powering [Tinkr](https://tinkr-01.vercel.app) — a privacy-first collection of 113 browser-based utilities.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router + Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS variables (terminal theme) |
| Icons | Lucide React + Emoji |
| Deployment | Vercel |

## Getting Started

```bash
# From repo root
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

## Key Files

```
frontend/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout (theme, font)
│   ├── globals.css           # Design tokens & global styles
│   └── tools/
│       └── [category]/[tool]/page.tsx   # Tool pages
├── components/
│   ├── ToolTemplate.tsx      # Premium terminal-style shell (use this for new tools)
│   ├── ToolSidebar.tsx       # Collapsible sidebar with search & category tree
│   └── LegacyToolWrapper.tsx # Wrapper for older tool pages
└── lib/
    ├── tools.ts              # Single source of truth — all tool metadata
    └── alltools.ts           # Re-export helper
```

## Adding a New Tool

### 1. Register in `lib/tools.ts`

```ts
{ name: 'My Tool', emoji: '🔧', category: 'web', url: '/tools/web/my-tool', description: 'Does something useful' }
```

### 2. Create `app/tools/web/my-tool/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import ToolTemplate from '@/components/ToolTemplate';

export default function MyTool() {
  const [value, setValue] = useState('');

  return (
    <ToolTemplate
      title="My Tool"
      description="Does something useful"
      icon="🔧"
      onReset={() => setValue('')}
    >
      <div className="space-y-4 max-w-3xl mx-auto">
        {/* your UI here */}
      </div>
    </ToolTemplate>
  );
}
```

> **Important:** Always add `mx-auto` alongside `max-w-*` on the root content div so it centers in the available area beside the sidebar.

### 3. That's it — the tool appears in the sidebar automatically.

## Design System

The app uses a terminal-inspired theme defined via CSS variables in `globals.css`:

| Variable | Purpose |
|---|---|
| `--background` | Page background |
| `--secondary-bg` | Card / panel background |
| `--foreground` | Primary text |
| `--muted-foreground` | Secondary / dimmed text |
| `--accent` | Amber highlight color |
| `--border` | Border color |

Dark and light modes are toggled by adding `.dark` / `.light` to `<html>`.

## Commands

```bash
npm run dev        # Dev server with hot reload
npm run build      # Production build
npm run lint       # ESLint
npx tsc --noEmit   # Type-check without building
```

## Tool Categories (18)

`calculator` · `color` · `converter` · `design` · `encoder` · `generator` · `image` · `math` · `pdf` · `reference` · `seo` · `security` · `text` · `typography` · `validator` · `code` · `web`
