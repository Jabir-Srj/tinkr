# Contributing to Tinkr

Thanks for your interest in contributing to Tinkr! We're excited to have you help make this collection of tools even better.

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to build something awesome together.

## How to Contribute

### 1. **Report Bugs**

Found a bug? Let us know!

- **Check existing issues** first to avoid duplicates
- **Include details:**
  - What browser/device are you using?
  - What steps lead to the bug?
  - What did you expect vs. what happened?
  - Screenshots or videos help!

### 2. **Suggest New Tools**

Have an idea for a tool? We'd love to hear it!

- **Open an issue** with the title: `[Feature] Tool Name`
- **Describe:**
  - What the tool does
  - Who would use it
  - What inputs/outputs it needs
  - Any examples or references

### 3. **Improve Existing Tools**

Want to make a tool better? Here's how:

- **Improve the UI/UX** - better design, clearer inputs, smoother interactions
- **Add features** - copy buttons, export formats, advanced options
- **Fix bugs** - if you spot something broken, fix it
- **Optimize performance** - faster calculations, smaller bundle size
- **Better error handling** - clear messages when something goes wrong

### 4. **Contribute Code**

#### Setup

```bash
# Clone the repo
git clone https://github.com/Jabir-Srj/tinkr.git
cd tinkr/frontend

# Install dependencies
npm install

# Start the dev server
npm run dev

# Visit http://localhost:3000
```

#### Creating a New Tool

1. **Create the directory:**
   ```bash
   mkdir -p app/tools/category/tool-name
   ```

2. **Create `page.tsx`:**
   ```typescript
   'use client';

   import { useState } from 'react';
   import ToolTemplate, { ToolCard, InputGroup } from '@/components/ToolTemplate';

   export default function ToolName() {
     const [input, setInput] = useState('');
     const [result, setResult] = useState('');

     const handleProcess = () => {
       // Your logic here
       setResult('output');
     };

     return (
       <ToolTemplate
         title="Tool Name"
         description="What this tool does"
         icon="🔧"
         onReset={() => {
           setInput('');
           setResult('');
         }}
       >
         <div className="grid lg:grid-cols-3 gap-6">
           {/* Input Section */}
           <ToolCard title="Input">
             <InputGroup label="Your Input">
               <input
                 type="text"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 placeholder="Enter something..."
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
             </InputGroup>
           </ToolCard>

           {/* Output Section */}
           {result && (
             <div className="lg:col-span-2">
               <ToolCard title="Result">
                 <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                   {result}
                 </pre>
                 <button
                   onClick={() => navigator.clipboard.writeText(result)}
                   className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                 >
                   Copy Result
                 </button>
               </ToolCard>
             </div>
           )}
         </div>
       </ToolTemplate>
     );
   }
   ```

3. **Add to `lib/tools.ts`:**
   ```typescript
   { 
     name: 'Tool Name', 
     emoji: '🔧', 
     category: 'category', 
     url: '/tools/category/tool-name', 
     description: 'What this tool does' 
   }
   ```
   Available categories: `calculator` · `color` · `converter` · `design` · `encoder` · `generator` · `image` · `math` · `pdf` · `reference` · `seo` · `security` · `text` · `typography` · `validator` · `code` · `web`

   > **Layout tip:** On the root content div inside `ToolTemplate`, always pair `max-w-*` with `mx-auto` so the content centers correctly beside the sidebar.

4. **Test locally:**
   - Run `npm run dev`
   - Navigate to your tool: `http://localhost:3000/tools/category/tool-name`
   - Test on mobile too!

5. **Build and verify:**
   ```bash
   npm run build
   ```

#### Before You Submit a PR

- [ ] Tool works perfectly in light AND dark mode
- [ ] Mobile responsive (test on phone-sized screens)
- [ ] Proper error handling with user-friendly messages
- [ ] Copy/download features work (if applicable)
- [ ] No console errors or warnings
- [ ] Follows the existing code style
- [ ] Uses Tailwind CSS for styling
- [ ] Client-side only (no backend calls)

#### Code Style Guidelines

- **Naming:** Use camelCase for variables/functions, PascalCase for components
- **Components:** Keep them simple and focused on one thing
- **Styling:** Use Tailwind CSS classes, respect dark mode
- **Comments:** Add comments for complex logic
- **Types:** Use TypeScript for type safety

**Dark Mode:** Always test in both light and dark modes!
```typescript
// Test dark mode
// In dev tools: document.documentElement.classList.add('dark')
```

### 5. **Improve Documentation**

- Fix typos in README or docs
- Add examples for tools
- Improve clarity in descriptions
- Create guides or tutorials

### 6. **Performance & Optimization**

- Reduce bundle size
- Optimize images
- Improve rendering speed
- Better caching strategies

## Submission Process

### Step 1: Create a Fork
```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR-USERNAME/tinkr.git
cd tinkr
git remote add upstream https://github.com/Jabir-Srj/tinkr.git
```

### Step 2: Create a Branch
```bash
# For new tools:
git checkout -b feature/add-tool-name

# For fixes:
git checkout -b fix/bug-description

# For improvements:
git checkout -b improve/feature-name
```

### Step 3: Make Your Changes
- Write clean, well-commented code
- Test thoroughly (especially on mobile & dark mode)
- Commit with clear messages

### Step 4: Keep Up to Date
```bash
git fetch upstream
git rebase upstream/main
```

### Step 5: Push & Create PR
```bash
git push origin your-branch-name
```

Then create a Pull Request on GitHub with:
- **Clear title:** `[Type] Description` (e.g., `[Feature] Add JSON to XML Converter`)
- **Description:**
  - What changes did you make?
  - Why did you make them?
  - Any testing done?
  - Screenshots if UI changes
- **Reference issues:** If fixing a bug, link the issue

### Step 6: Review & Merge
- Be patient while we review
- Address feedback promptly
- Once approved, we'll merge! 🎉

## What We're Looking For

✅ **Good contributions:**
- Tools that work client-side only
- Useful and practical functionality
- Clean, readable code
- Proper error handling
- Responsive design
- Dark mode support
- Clear, honest descriptions

❌ **We won't accept:**
- Tools requiring backend/server
- Data collection or tracking
- Cryptocurrency/blockchain hype
- Anything that violates the MIT License

## Questions?

- **For issues:** Open an issue on GitHub
- **For ideas:** Start a discussion
- **For help:** Comment on relevant issues

## Recognition

Contributors will be recognized in:
- `CONTRIBUTORS.md` (we'll create this!)
- GitHub contributor graph
- Special mention in releases (if substantial contribution)

## Technical Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Styling:** Tailwind CSS + CSS variables (terminal theme)
- **Language:** TypeScript
- **Deployment:** Vercel
- **Libraries:** Minimal (keep it lightweight!)

## Testing Checklist

Before submitting:

- [ ] Tool works on Chrome
- [ ] Tool works on Firefox
- [ ] Tool works on Safari
- [ ] Mobile (iPhone size - 375px width)
- [ ] Tablet (iPad size - 768px width)
- [ ] Desktop (1920px+)
- [ ] Dark mode enabled
- [ ] Light mode enabled
- [ ] No console errors
- [ ] Copy/Download works (if applicable)
- [ ] Error messages are helpful
- [ ] Loading states are clear
- [ ] All text is readable

## Performance Guidelines

- Tool should load instantly
- Calculations should be <100ms
- File downloads should work smoothly
- No unnecessary re-renders
- Keep component bundle small

## License

By contributing, you agree your code will be licensed under the MIT License (same as the project).

## Need Help?

- Read the code - it's all there!
- Check existing similar tools
- Ask in issues/discussions
- Look at recent PRs for examples

---

**Thanks for making Tinkr better!** Every contribution, no matter how small, helps. 🙌

Happy coding! 🚀
