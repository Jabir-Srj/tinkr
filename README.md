# Tinkr - Web Tools Collection 🛠️

A curated collection of small, useful web tools that work entirely in your browser.

**Philosophy:** No logins. No registration. No data collection. Just tools that work.

## ✨ Features

- ✅ **No backend needed** - Everything runs in your browser
- ✅ **Privacy first** - Zero data collection, no tracking
- ✅ **Works offline** - After initial load, no internet needed
- ✅ **Fast & responsive** - Instant results
- ✅ **Mobile friendly** - Works on all devices
- ✅ **Beautiful UI** - Clean, minimal design with Tailwind CSS

## 🛠️ Tools (94+ - All Functional)

### Calculators (18 tools)
- Age Calculator, BMI Calculator, Loan Calculator, Mortgage Calculator
- ROI Calculator, GPA Calculator, Tip & Split Calculator, Discount Calculator
- Currency Converter, Universal Converter, Percentage Calculator, Tip Calculator
- Statistics, Scientific Calculator, Base Converter, Unit Converter
- Unit Converter Advanced, Matrix Calculator

### Data & Analysis (5 tools)
- CSV to JSON, JSON to CSV, XML to JSON, YAML Parser, Data Formatter

### Security & Encryption (4 tools)
- ROT13 Encoder, Caesar Cipher, Base32 Encoder, Hex Encoder

### Colors (7 tools)
- Color Converter Pro, Contrast Checker, Blindness Simulator
- Gradient Generator, Palette Generator, Color Name Finder

### Text & Analysis (14 tools)
- Slug Generator, String Reverser, Palindrome Checker, Text Statistics
- Lipsum Generator, Lorem Picker, Markdown Preview, Text Scratchpad
- ASCII Code Lookup, Binary Translator, Case Converter
- Diff Checker, Word Frequency Analyzer, Readability Score

### Validators (5 tools)
- Email Validator, URL Validator, JSON Validator, UUID Validator, IP Validator

### Web & Development (9 tools)
- URL Parser, HTTP Status Codes, Regex Tester Advanced
- API Response Formatter, DNS Lookup Simulator
- Regex Tester, Regex Patterns Library
- CSS Minifier, HTML Minifier

### Images & Design (8 tools)
- QR Code Generator, Barcode Generator, Avatar Generator
- Placeholder Generator, SVG to PNG, SVG Editor
- Image Metadata Viewer, Font Preview

### Generators (7 tools)
- Meta Tags Generator, Invoice Generator, vCard Generator
- Base64 Encoder, URL Encoder, Hash Generator
- Checksum Generator

### Reference & Utilities (10 tools)
- Timezone Converter, Unit Converter, File Size Converter
- Prime Checker, Fibonacci Generator
- Password Checker, Tailwind Cheat Sheet
- Morse Code Translator, Data URI Generator
- And more...

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone repository**
```bash
cd C:\Users\Jabir\Documents\GitHub\tinkr
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

---

## 📁 Project Structure

```
tinkr/
├── frontend/                    # Next.js 16 app
│   ├── app/
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx          # Main layout
│   │   ├── globals.css         # Global styles
│   │   └── tools/
│   │       ├── page.tsx        # Tools directory
│   │       └── [category]/[toolId]/
│   │           └── page.tsx    # Individual tool pages
│   ├── components/
│   │   ├── ToolTemplate.tsx    # Tool template component
│   │   ├── ToolSidebar.tsx     # Navigation sidebar
│   │   ├── ToolCard.tsx        # Tool card component
│   │   └── LegacyToolWrapper.tsx # Legacy tool support
│   ├── lib/
│   │   ├── tools.ts            # Tool definitions & metadata
│   │   ├── math.ts             # Math utilities
│   │   ├── text.ts             # Text utilities
│   │   └── color.ts            # Color utilities
│   └── public/
│       └── fonts/              # Custom fonts
└── README.md
```

---

## 🎯 Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

---

## 🚢 Deployment (Vercel)

One-command deployment to Vercel:

```bash
cd frontend
npx vercel deploy
```

Or connect GitHub repo to Vercel for automatic deployments on push.

**Live Demo:** https://frontend-jabirsrjs-projects.vercel.app

---

## 🛠️ How to Add a New Tool

### 1. Create tool metadata in `lib/tools.ts`
```typescript
export const tools = [
  {
    name: 'My New Tool',
    emoji: '🔧',
    category: 'category-name',
    url: '/tools/category/my-new-tool',
    description: 'What this tool does'
  },
  // ...
];
```

### 2. Create tool page at `app/tools/category/my-new-tool/page.tsx`
```typescript
'use client';

import { useState } from 'react';
import { ToolTemplate, ToolCard, InputGroup, OutputGroup } from '@/components/ToolTemplate';
import { Copy } from 'lucide-react';

export default function MyNewTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleProcess = () => {
    // Your logic here
    setOutput(result);
  };

  return (
    <ToolTemplate
      title="My New Tool"
      description="Tool description"
      icon="🔧"
      onReset={() => {
        setInput('');
        setOutput('');
      }}
    >
      <ToolCard>
        <InputGroup label="Input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input..."
            className="w-full px-4 py-2 border rounded"
          />
        </InputGroup>

        <button
          onClick={handleProcess}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Process
        </button>

        <OutputGroup label="Output">
          <div className="relative">
            <input
              type="text"
              value={output}
              readOnly
              className="w-full px-4 py-2 border rounded bg-gray-50"
            />
            {output && (
              <Copy
                size={20}
                className="absolute right-3 top-2 cursor-pointer text-gray-600"
                onClick={() => navigator.clipboard.writeText(output)}
              />
            )}
          </div>
        </OutputGroup>
      </ToolCard>
    </ToolTemplate>
  );
}
```

### 3. That's it! Tool is now available at `/tools/category/my-new-tool`

---

## 🎨 Design System

- **Framework:** Next.js 16+ with App Router & Turbopack
- **Styling:** Tailwind CSS with dark mode
- **Icons:** Lucide React + Emoji
- **Components:** Reusable, accessible components
- **Responsive:** Mobile-first design with proper breakpoints

### Theme
- **Light Mode:** Clean, minimal aesthetic
- **Dark Mode:** Full support with theme toggle
- **Accessibility:** WCAG compliant color contrast
- **Performance:** Optimized for fast load times

---

## 📝 Tool Categories

### Data Processing
- Converters (CSV, JSON, XML, YAML)
- Formatters (JSON, API responses)
- Parsers (URL, DNS, Metadata)

### Security & Crypto
- Encoders (Base64, Base32, Hex, URL)
- Hash Generators (MD5, SHA256)
- Ciphers (ROT13, Caesar)

### Utilities
- Text tools (slugs, reversal, word count)
- Calculators (age, BMI, loan, mortgage, etc.)
- Generators (UUID, QR codes, barcodes, etc.)

### Development
- Code minifiers (CSS, HTML)
- Regex tester & patterns
- HTTP status codes reference
- Tailwind CSS cheat sheet

### Design
- Color tools (converter, contrast, blindness simulator)
- Image tools (metadata, QR codes, avatars)
- Font previewer

---

## 🔒 Privacy Guarantee

- ✅ No cookies (except functional)
- ✅ No analytics
- ✅ No tracking pixels
- ✅ No third-party scripts
- ✅ All processing happens locally
- ✅ Open source design principles

---

## 🤝 Contributing

This is a personal project by Jabir, but improvements and new tools are welcome!

1. Fork the repository
2. Create a feature branch
3. Add your tool
4. Test thoroughly
5. Submit a pull request

---

## 📜 License

MIT License - Use freely for any purpose

---

## 👨‍💻 Author

**Jabir** - Building tools that respect your privacy

- GitHub: [@Jabir-Srj](https://github.com/Jabir-Srj)
- Email: jabirsrj8@gmail.com
- Location: Kuala Lumpur, Malaysia
- Undergrad: Computer Science @ Taylor's University

---

## 🙏 Acknowledgments

Inspired by the spirit of the "handmade web" - making simple, useful tools without unnecessary complexity or bloat.

Built with:
- Next.js 16 (Turbopack)
- Tailwind CSS
- React 19
- Vercel hosting

---

**Made with ❤️ and respect for your privacy** 🚀

Latest update: 94 tools, 16 categories, fully responsive with dark mode support.
