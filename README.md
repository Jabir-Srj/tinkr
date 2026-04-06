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

## 🛠️ Tools (109 - All Functional)

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

### Colors (8 tools)
- Color Converter Pro, Contrast Checker, Blindness Simulator
- Gradient Generator, Palette Generator, Color Name Finder, Font Preview

### Text & Analysis (14 tools)
- Slug Generator, String Reverser, Palindrome Checker, Text Statistics
- Lipsum Generator, Lorem Picker, Markdown Preview, Text Scratchpad
- ASCII Code Lookup, Binary Translator, Case Converter
- Diff Checker, Word Frequency Analyzer, Readability Score

### Validators (6 tools)
- Email Validator, URL Validator, JSON Validator, UUID Validator, IP Validator, Regex Patterns

### Web & Development (9 tools)
- URL Parser, HTTP Status Codes, Regex Tester Advanced
- API Response Formatter, DNS Lookup Simulator
- Regex Tester, CSS Minifier, HTML Minifier
- Tailwind CSS Cheat Sheet

### Images & Design (8 tools)
- QR Code Generator, Barcode Generator, Avatar Generator
- Placeholder Generator, SVG to PNG, SVG Editor
- Image Metadata Viewer, Image Compressor, Image Resizer
- Image Format Converter, Image to Base64, Image Noise Reducer

### PDF Tools (5 tools)
- PDF Generator, PDF Merger, PDF Splitter
- PDF to Text Converter, PDF Watermark Remover

### Generators (7 tools)
- Meta Tags Generator, Invoice Generator, vCard Generator
- UUID Generator, Base64 Encoder, URL Encoder
- Hash Generator, Checksum Generator

### Reference & Utilities (15+ tools)
- Timezone Converter, Unit Converter, File Size Converter
- Prime Checker, Fibonacci Generator
- Password Checker, Morse Code Translator
- Data URI Generator, and more...

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone repository**
```bash
git clone https://github.com/Jabir-Srj/tinkr.git
cd tinkr/frontend
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
│   │   ├── theme-provider.tsx  # Theme management
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
├── CONTRIBUTING.md             # Contribution guidelines
├── LICENSE                     # MIT License
└── README.md
```

---

## 🎯 Development Commands

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Run tests (if available)
npm run test
```

---

## 🚢 Deployment (Vercel)

The project is optimized for Vercel deployment:

```bash
# Deploy to Vercel
npx vercel deploy
```

Or connect your GitHub repository to Vercel for automatic deployments on every push.

**Live Demo:** https://tinkr-01.vercel.app

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
import ToolTemplate, { ToolCard, InputGroup } from '@/components/ToolTemplate';
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
      <ToolCard title="Input">
        <InputGroup label="Your Input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input..."
            className="w-full px-4 py-2 border rounded"
          />
        </InputGroup>
      </ToolCard>

      {output && (
        <ToolCard title="Output">
          <div className="relative">
            <input
              type="text"
              value={output}
              readOnly
              className="w-full px-4 py-2 border rounded bg-gray-50"
            />
            <Copy
              size={20}
              className="absolute right-3 top-2 cursor-pointer text-gray-600"
              onClick={() => navigator.clipboard.writeText(output)}
            />
          </div>
        </ToolCard>
      )}
    </ToolTemplate>
  );
}
```

### 3. That's it! Tool is now available at `/tools/category/my-new-tool`

For detailed instructions, see [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 🎨 Design System

- **Framework:** Next.js 16+ with App Router & Turbopack
- **Styling:** Tailwind CSS with dark mode support
- **Icons:** Lucide React + Emoji
- **Components:** Reusable, accessible components
- **Responsive:** Mobile-first design with proper breakpoints
- **Performance:** Optimized for fast load times

### Theme Support
- **Light Mode:** Clean, minimal aesthetic
- **Dark Mode:** Full support with persistent theme toggle
- **Accessibility:** WCAG compliant color contrast ratios
- **Animations:** Smooth transitions and interactions

---

## 📝 Tool Categories Overview

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
- Regex tester & patterns library
- HTTP status codes reference
- Tailwind CSS quick reference

### Design & Media
- Color tools (converter, contrast, blindness simulator)
- Image processing (compression, resizing, format conversion)
- PDF tools (generate, merge, split, extract text)
- Font previewer

---

## 🔒 Privacy Guarantee

- ✅ No cookies (except functional browser defaults)
- ✅ No analytics tracking
- ✅ No tracking pixels
- ✅ No third-party scripts
- ✅ All processing happens client-side only
- ✅ Open source and auditable
- ✅ Source code available on GitHub

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on:
- Setting up your development environment
- Creating new tools
- Code style and quality standards
- Testing requirements
- Pull request process

---

## 📜 License

MIT License - You're free to use, modify, and distribute this project. See [LICENSE](LICENSE) for details.

---

## 👨‍💻 Author

**Jabir** - Creator of Tinkr

- GitHub: [@Jabir-Srj](https://github.com/Jabir-Srj)
- Location: Kuala Lumpur, Malaysia
- Education: Computer Science Undergraduate

---

## 🙏 Acknowledgments

Inspired by the principles of the handmade web - creating simple, useful, privacy-respecting tools without unnecessary complexity or bloat.

Built with:
- Next.js 16.2.2 (with Turbopack)
- Tailwind CSS
- React 19
- jsPDF & Canvas API for advanced features
- Vercel for hosting

---

## 📊 Project Stats

- **Tools:** 109 fully functional utilities
- **Categories:** 17 well-organized categories
- **Bundle Size:** Optimized and minimal
- **Performance:** Sub-50ms response times
- **Accessibility:** WCAG compliant
- **Browser Support:** All modern browsers (Chrome, Firefox, Safari, Edge)

---

**Made with ❤️ in respect for your privacy and time** 🚀

Latest version: 109 tools, 17 categories, production-ready with dark mode, mobile-responsive design, and full offline support.
