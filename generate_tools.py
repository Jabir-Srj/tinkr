#!/usr/bin/env python3
import os
import json

TEMPLATE = '''\'use client\';

import {{ useState }} from \'react\';
import Link from \'next/link\';
import {{ motion }} from \'framer-motion\';
import {{ ArrowLeft, Copy, Check }} from \'lucide-react\';

const fadeIn = {{
  hidden: {{ opacity: 0 }},
  visible: {{ opacity: 1, transition: {{ duration: 0.3 }} }},
}};

export default function {component_name}() {{
  const [input, setInput] = useState(\'\');
  const [copied, setCopied] = useState(false);

  const result = input ? \'{placeholder_result}\' : \'\';

  const copy = () => {{
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }};

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <motion.header
        initial="hidden"
        animate="visible"
        variants={{fadeIn}}
        className="sticky top-0 z-50 border-b border-gray-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-[#c96442]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">{emoji} {tool_name}</h1>
        </div>
      </motion.header>

      <motion.main
        initial="hidden"
        animate="visible"
        variants={{fadeIn}}
        className="max-w-2xl mx-auto px-6 py-12"
      >
        <div className="space-y-3 mb-6">
          <label className="block text-sm font-medium">Input</label>
          <textarea
            value={{input}}
            onChange={{(e) => setInput(e.target.value)}}
            placeholder="{placeholder}"
            className="w-full h-24 p-4 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:border-[#c96442]"
          />
        </div>

        <div className="space-y-3 mb-6">
          <label className="block text-sm font-medium">Output</label>
          <div className="relative">
            <textarea
              value={{result}}
              readOnly
              className="w-full h-24 p-4 border border-gray-300 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white"
            />
            {{result && (
              <button
                onClick={{copy}}
                className="absolute top-2 right-2 p-2 bg-gray-100 dark:bg-slate-700 rounded hover:bg-[#c96442] hover:text-white"
              >
                {{copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}}
              </button>
            )}}
          </div>
        </div>
      </motion.main>
    </div>
  );
}}
'''

tools = [
    {"name": "Unit Converter", "path": "calculator/units", "emoji": "📏", "placeholder": "100 km"},
    {"name": "Time Converter", "path": "calculator/time", "emoji": "⏱️", "placeholder": "1609459200"},
    {"name": "Text Scratchpad", "path": "misc/scratchpad", "emoji": "📝", "placeholder": "Type here..."},
    {"name": "Barcode Generator", "path": "misc/barcode", "emoji": "📊", "placeholder": "123456789"},
]

for tool in tools:
    full_path = f"C:/Users/Jabir/Documents/GitHub/tinkr/frontend/app/tools/{tool['path']}/page.tsx"
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    
    component = tool['name'].replace(' ', '').replace('-', '')
    content = TEMPLATE.format(
        component_name=component,
        tool_name=tool['name'],
        emoji=tool['emoji'],
        placeholder=tool['placeholder'],
        placeholder_result="Result"
    )
    
    with open(full_path, 'w') as f:
        f.write(content)
    
    print(f"✓ Created: {tool['name']}")

print(f"\n✓ Total tools created: {len(tools)}")
