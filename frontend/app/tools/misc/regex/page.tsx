'use client';

import { useState } from 'react';
import ToolTemplate, { InputGroup, OutputGroup, ToolCard } from '@/components/ToolTemplate';
import { Copy, CheckCircle, XCircle } from 'lucide-react';

const commonPatterns = {
  email: {
    pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    description: 'Email address',
  },
  url: {
    pattern: 'https?://[^\\s]+',
    description: 'URL (http/https)',
  },
  phone: {
    pattern: '^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$',
    description: 'Phone number',
  },
  zipcode: {
    pattern: '^[0-9]{5}(?:-[0-9]{4})?$',
    description: 'US ZIP code',
  },
  ipv4: {
    pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
    description: 'IPv4 address',
  },
  hexcolor: {
    pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
    description: 'Hex color code',
  },
  date: {
    pattern: '^(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/\\d{4}$',
    description: 'Date (MM/DD/YYYY)',
  },
  username: {
    pattern: '^[a-zA-Z0-9_]{3,16}$',
    description: 'Username (3-16 alphanumeric)',
  },
};

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
  const [testString, setTestString] = useState('user@example.com');
  const [flags, setFlags] = useState('g');
  const [matches, setMatches] = useState<RegExpMatchArray | null>(null);
  const [error, setError] = useState('');

  const testRegex = () => {
    try {
      setError('');
      const regex = new RegExp(pattern, flags);
      const result = testString.match(regex);
      setMatches(result);
    } catch (err: any) {
      setError(err.message);
      setMatches(null);
    }
  };

  const testPattern = (pat: string) => {
    setPattern(pat);
    try {
      setError('');
      const regex = new RegExp(pat, flags);
      const result = testString.match(regex);
      setMatches(result);
    } catch (err: any) {
      setError(err.message);
      setMatches(null);
    }
  };

  return (
    <ToolTemplate
      title="Regular Expression Tester"
      description="Test and debug regular expressions in real-time"
      icon="🔍"
      onReset={() => {
        setPattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
        setTestString('user@example.com');
        setFlags('g');
        setMatches(null);
        setError('');
      }}
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-1">
          <ToolCard title="Regex Pattern">
            <InputGroup label="Pattern">
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </InputGroup>

            <InputGroup label="Flags">
              <div className="space-y-2">
                {[
                  { value: 'g', label: 'Global (g)' },
                  { value: 'i', label: 'Case-insensitive (i)' },
                  { value: 'm', label: 'Multiline (m)' },
                  { value: 's', label: 'Dotall (s)' },
                ].map((flag) => (
                  <label key={flag.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={flags.includes(flag.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFlags((f) => f + flag.value);
                        } else {
                          setFlags((f) => f.replace(flag.value, ''));
                        }
                      }}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{flag.label}</span>
                  </label>
                ))}
              </div>
            </InputGroup>

            <button
              onClick={testRegex}
              className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Test Regex
            </button>
          </ToolCard>
        </div>

        {/* Test */}
        <div className="lg:col-span-2">
          <ToolCard title="Test String">
            <InputGroup label="Input">
              <textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Enter text to test..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
              />
            </InputGroup>

            {/* Results */}
            {error ? (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
                <XCircle className="text-red-600 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-200">Error</p>
                  <p className="text-sm text-red-800 dark:text-red-300 font-mono">{error}</p>
                </div>
              </div>
            ) : matches ? (
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg flex gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-200">Match Found!</p>
                    <p className="text-sm text-green-800 dark:text-green-300">{matches.length} match(es)</p>
                  </div>
                </div>

                {matches.length > 0 && (
                  <div className="bg-gray-100 dark:bg-slate-900 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Matches:</p>
                    <div className="space-y-2">
                      {matches.map((match, idx) => (
                        <div
                          key={idx}
                          className="bg-white dark:bg-slate-800 p-3 rounded border border-gray-200 dark:border-slate-700 font-mono text-sm break-all"
                        >
                          {match}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-6 p-4 bg-gray-100 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg text-center text-gray-500 dark:text-gray-400">
                No matches found
              </div>
            )}
          </ToolCard>

          {/* Common Patterns */}
          <ToolCard title="Common Patterns">
            <div className="space-y-2">
              {Object.entries(commonPatterns).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => testPattern(val.pattern)}
                  className="w-full text-left p-3 bg-gray-100 dark:bg-slate-900 hover:bg-gray-200 dark:hover:bg-slate-800 rounded transition text-sm"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">{val.description}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-mono truncate">
                    {val.pattern}
                  </p>
                </button>
              ))}
            </div>
          </ToolCard>
        </div>
      </div>
    </ToolTemplate>
  );
}
